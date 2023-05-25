import { Box, Button, Tooltip } from "@chakra-ui/react";
import { useState } from "react";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  return (
    <Box>
    <Tooltip label="Search Users to Chat"
    hasArrow placement="bottom-end">
    <Button variant="ghost">
    <i class="fa-solid fa-magnifying-glass"></i>
    </Button>
     
    </Tooltip>
    </Box>
  )
}

export default Sidebar