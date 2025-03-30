import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface ChuckNorrisResponse {
  value: string;
  created_at: string;
}

const fetchChuckNorrisQuote = async (): Promise<ChuckNorrisResponse> => {
  const response = await fetch("https://api.chucknorris.io/jokes/random");
  if (!response.ok) {
    throw new Error("Failed to fetch Chuck Norris quote");
  }
  return response.json();
};

export default function ChuckMessage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chuckNorris"],
    queryFn: fetchChuckNorrisQuote,
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading quote</Typography>;

  return (
    <Box
      sx={{
        pt: 2,
        borderRadius: 2,
        width: "100%",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          mb: 1,
          fontStyle: "italic",
        }}
      >
        {data.value}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        By Chuck Norris.
      </Typography>
    </Box>
  );
}
