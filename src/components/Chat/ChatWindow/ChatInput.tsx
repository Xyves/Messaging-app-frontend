import { Box, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useColorMode } from "../../ui/color-mode";

export default function ChatInput() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box position="relative" display="inline-block " width="3/4">
      <Input
        placeholder="Say something..."
        variant="subtle"
        background={colorMode === "light" ? "whiteAlpha.950" : "blackAlpha.900"}
        color={colorMode === "light" ? "whiteAlpha.950" : "blackAlpha.900"}
      />
    </Box>
  );
}
