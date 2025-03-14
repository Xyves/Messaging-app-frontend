import { Box, Grid } from "@chakra-ui/react";
import "primeicons/primeicons.css";

import Friendlist from "../components/Chat/Sidebar/Friendlist";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
//@ts-ignore
import { fetchUser } from "../features/authActions";
import Loading from "../components/Loading";

import UserInfo from "../components/Chat/Sidebar/UserInfo";
import MainChat from "../components/Chat/ChatWindow/MainChat";
import { useParams } from "react-router";
//@ts-ignore
import { fetchFriends } from "../features/authActions";
import { useColorMode } from "../components/ui/color-mode";
import { RootState } from "../app/store";
import { useAppSelector } from "../app/hooks";
export default function Chat() {
  const { toggleColorMode, colorMode } = useColorMode();

  const bg = colorMode === "light" ? "#FFFF" : "#2C4251";
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, user, userToken } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  useEffect(() => {
    if (userToken) {
      dispatch(fetchUser());
    }
  }, [dispatch, userToken]);

  useEffect(() => {
    const getFriends = async () => {
      if (userToken) {
        try {
          console.log("The user while fetching friends:", user.nickname);
          const response = await dispatch(fetchFriends(user.nickname));
          setFriends(response.payload);
          console.log("friendlist:", response.payload);
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      }
    };

    getFriends();
  }, []);
  const memoizedFriends = useMemo(() => friends, [friends]);
  if (loading) {
    <Loading />;
  }
  return (
    <Grid templateColumns={"14"} height={"88vh"} width="full">
      <Box overflowY="auto" height="auto" width="3/4" background={bg}>
        <UserInfo user={user} />
        <Friendlist
          friends={memoizedFriends}
          onSelectFriend={setSelectedFriend}
        />
      </Box>
      <Box
        gridColumnStart="2"
        gridColumnEnd="11"
        rounded="2xl"
        width="10/12"
        margin="auto"
      >
        {id ? (
          <MainChat
            messages={messages}
            setMessages={setMessages}
            selectedFriend={selectedFriend}
          />
        ) : (
          ""
        )}
      </Box>
    </Grid>
  );
}
