import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { ref, set } from "firebase/database";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { db } from "../firebase";

export function Signup() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const AuthFunc = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      if (emailRef?.current?.value && passwordRef?.current?.value) {
        await AuthFunc?.signup(
          emailRef?.current?.value,
          passwordRef?.current?.value
        );
        set(ref(db, `${emailRef?.current?.value.split("@")[0]}`), "");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setError("Failed to create an account");
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
        Sign Up!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account yet?{" "}
        <Anchor<"a">
          href="#"
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            navigate("/login");
          }}
        >
          login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@email.com"
          required
          ref={emailRef}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          ref={passwordRef}
          error={error}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="confirm password"
          required
          ref={passwordConfirmRef}
          mt="md"
          error={error}
        />
        <Button disabled={loading} fullWidth mt="xl" onClick={handleSubmit}>
          Sign up
        </Button>
      </Paper>
    </Container>
  );
}
