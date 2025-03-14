import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { PasswordInput } from "../components/ui/password-input";
import { Field } from "../components/ui/field";
import { Button } from "../components/ui/button";
import { Link, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
// @ts-ignore
import { registerUser } from "../features/authActions.js";
import Loading from "../components/Loading.js";
import { RootState } from "../app/store.js";
import { useAppSelector } from "../app/hooks.js";

export default function Register() {
  const { loading, user, userToken, error } = useAppSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {}, [navigate, userInfo, success]);

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<registerData>();
  interface registerData {
    nickname: string;
    password: string;
    email: string;
  }
  const submitForm: SubmitHandler<registerData> = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
    navigate("/login");
  };

  if (loading) {
    <Loading />;
  }
  if (error) {
    <Navigate to={"/"} />;
  }
  // if (success) return <Navigate to="/login" replace />;
  if (userToken) return <Navigate to="/chat" replace />;
  return (
    <Flex justifyContent={"center"} alignContent={"center"} marginY="auto">
      <Box
        width="80"
        height="55vh"
        margin="auto"
        alignItems={"center"}
        display="flex"
        justifyContent={"center"}
        background={"white"}
        color="black"
        rounded="md"
      >
        <Box padding="5">
          <Heading fontSize="3xl" marginBottom="-2">
            Sign up{" "}
          </Heading>
          <Text marginY="6" fontSize={"lg"}>
            Log In <Link to="/login">here</Link>
          </Text>
          <form method="post" onSubmit={handleSubmit(submitForm)}>
            <Field label="nickname" required>
              <Input
                placeholder="John Doe"
                size="md"
                {...register("nickname")}
                css={{ "--focus-color": "#db2777" }}
                marginBottom="5"
              />
            </Field>
            <Field label="email" required>
              <Input
                placeholder="example@domain.com"
                size="md"
                {...register("email")}
                css={{ "--focus-color": "#db2777" }}
                marginBottom="5"
              />
            </Field>
            <Field label="Password" required>
              <PasswordInput
                {...register("password")}
                name="password"
                id="password"
              />
            </Field>
            <Button
              background={"#db2777"}
              variant="solid"
              rounded={"2xl"}
              marginTop={"8"}
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
