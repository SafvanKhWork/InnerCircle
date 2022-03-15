import {
  CardContent,
  Grid,
  ThemeProvider,
  Box,
  Collapse,
  Paper,
  Card,
  SpeedDial,
  SpeedDialAction,
  Tabs,
  Tab,
  TabList,
  TabPanel,
} from "@mui/material";

const SideBox = (props) => {
  return (
    <Paper elevation={4}>
      <Card>
        <Box
          justifyContent={"space-between"}
          minHeight={520}
          maxHeight={520}
          py={1}
          px={2}
        >
          <Box pb={3} sx={{ width: "100%", bgcolor: "background.paper" }}>
            {/* <Tabs value={value} onChange={handleChange} centered> 
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                  </Tabs> */}
          </Box>
        </Box>
      </Card>
    </Paper>
  );
};

export default SideBox;
