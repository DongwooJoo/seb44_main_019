package com.shellwe.websocket.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Positive;

public class WsDto {
    @Builder
    @Getter
    public static class Post{
        @Positive
        private long myShellId;
        @Positive
        private long sellerShellId;
        @Positive
        private long sellerMemberId;
    }

    @Builder
    @Getter
    public static class Response{
        private long roomId;
        private boolean unread;
        private MemberDto.Response member;
    }
}
