import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { AuthError } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export function LoginComp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const AuthFunc = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthFunc?.currentUser !== null) {
      navigate("/");
    }
  }, [AuthFunc?.currentUser, navigate]);

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      if (emailRef?.current?.value && passwordRef?.current?.value) {
        await AuthFunc?.login(
          emailRef?.current?.value,
          passwordRef?.current?.value
        );
        // navigate("/");
      }
    } catch (e) {
      setError("Email or Password incorrect");
    }
    setLoading(false);
  }
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor<"a">
          href="#"
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            navigate("/signup");
          }}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@email.com"
          ref={emailRef}
          error={error}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          ref={passwordRef}
          error={error}
          required
          mt="md"
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
        </Group>
        <Button fullWidth mt="xl" disabled={loading} onClick={handleSubmit}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
