"use client";
import AccountsList from "@/components/AccountsList";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth={false}>
      <AccountsList />
    </Container>
  );
}
