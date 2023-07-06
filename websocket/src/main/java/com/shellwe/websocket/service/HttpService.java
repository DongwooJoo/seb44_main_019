package com.shellwe.websocket.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shellwe.websocket.dto.ChatRoom;
import com.shellwe.websocket.dto.ResponseDto;
import com.shellwe.websocket.dto.RoomDto;
import com.shellwe.websocket.entity.Member;
import com.shellwe.websocket.entity.MemberRoom;
import com.shellwe.websocket.entity.Message;
import com.shellwe.websocket.entity.Room;
import com.shellwe.websocket.exception.businessLogicException.BusinessLogicException;
import com.shellwe.websocket.exception.businessLogicException.ExceptionCode;
import com.shellwe.websocket.mapper.RoomMapper;
import com.shellwe.websocket.repository.MemberRepository;
import com.shellwe.websocket.repository.MemberRoomRepository;
import com.shellwe.websocket.repository.MessageRepository;
import com.shellwe.websocket.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

@Slf4j
@Service
@Transactional
public class HttpService extends com.shellwe.websocket.service.Service {
    @Value("${client-server.url}")
    private String url;

    public HttpService(MemberRoomRepository memberRoomRepository,
                       MemberRepository memberRepository,
                       RoomRepository roomRepository,
                       MessageRepository messageRepository,
                       RoomMapper roomMapper) {
        super(memberRoomRepository, memberRepository, roomRepository, messageRepository, roomMapper);
    }

    public List<RoomDto.Response> findAllRoom() {
        long myId = 1; // security context holder 접근 필요
        List<MemberRoom> memberRooms = memberRoomRepository.findAllMyRoomsWithSeller(myId);

        return roomMapper.memberRoomsToWsResponses(memberRooms);
    }

    public ChatRoom findRoomById(Long roomId) {
        // db에서 룸 검색, 이후 메세지 unread true만 리턴

        return null;
    }

    public void deleteRoom(long roomId){
        long memberId = 1L; // context holder 연결 필요

        MemberRoom memberRoom = findExistsMemberRoom(roomId, memberId);

        memberRoom.setActive(false);
        memberRoomRepository.save(memberRoom);
    }
    public ResponseDto createRoom(RoomDto.Post requestBody) {
        Room room = roomRepository.save(new Room());
        long myId = 1; // security context holder 접근 필요
        long sellerId = requestBody.getSellerMemberId();

        // 생성된 룸과 멤버들 연결
        linkMemberToRoom(room, myId);
        linkMemberToRoom(room, sellerId);

        long myShellId = requestBody.getMyShellId();
        long sellerShellId = requestBody.getSellerMemberId();

        // 생성된 룸에 상품정보 메세지 생성
        createInitMessage(room,myId,myShellId);
        createInitMessage(room,sellerId,sellerShellId);

        // 프론트엔드와 상의 후 response 다시 정의
        return ResponseDto.builder()
                .roomsUrl("http://localhost:8080/chat")
                .roomUrl("ws://localhost:8080/chat?roomId="+ room.getRoomId() + "&memberId="+ myId)
                .build();
    }

    private void linkMemberToRoom(Room room, long memberId){
        Member member = new Member(memberId);
        MemberRoom memberRoom = new MemberRoom();
        memberRoom.setRoom(room);
        memberRoom.setMember(member);
        memberRoomRepository.save(memberRoom);

    }

    private void createInitMessage(Room room, long memberId, long shellId){
        Member member = findExistsMember(memberId);
        Message message = new Message();
        message.setRoom(room);
        message.setNotification(true);
        message.setPayload(member.getDisplayName()+"님께서 거래하실 Shell : " + url +"/shells/"+shellId);
        messageRepository.save(message);
    }
}