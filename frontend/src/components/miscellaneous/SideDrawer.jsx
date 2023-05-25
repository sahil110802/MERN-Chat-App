import { Box, Button, Tooltip } from "@chakra-ui/react";
import { useState } from "react";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchresult, setSearchresult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingchat, setLoadingchat] = useState();
  return (
    <div>
    <Box>
    <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
    <Button variant="ghost">
    <i className="fa-solid fa-magnifying-glass"></i>
    </Button>
    </Tooltip>
    </Box>
    </div>
  )
}

export default SideDrawer