package com.shellwe.server.domain.shell.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SearchResponseDto {

    private List<ShellResponseDto> shells;
}
