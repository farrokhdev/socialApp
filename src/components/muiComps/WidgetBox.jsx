import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetBox = styled(Box)(({ theme }) => ({
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.alt,
  // color: theme.palette.primary.main,
  borderRadius: "0.75rem",
  height: "fit-content",
}));

export default WidgetBox;
