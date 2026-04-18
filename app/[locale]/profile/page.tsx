"use client";

import { Container, Typography } from "@mui/material";
import { useI18n } from "../../../locales/client";

export default function Profile() {
  const t = useI18n();

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        {t("settings.title")}
      </Typography>
    </Container>
  );
}
