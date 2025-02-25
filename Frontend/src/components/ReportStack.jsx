import {Box,Typography, useTheme} from "@mui/material";
import {tokens} from "../theme";

const ReportStack = ({title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box width="100%" m="0 30px">
        <Box display="flex" justifyContent="space-between"></Box>
    </Box>
  );
}

export default ReportStack;