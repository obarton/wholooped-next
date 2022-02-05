import { Stack } from "react-bootstrap";
import NextLink from "../../NextLink";

export default function Pagination({ totalPages, currentPage, prevDisabled, nextDisabled }: any) {

  const prevPageUrl =
    currentPage === "2"
      ? "/looppacks"
      : `/looppacks/page/${parseInt(currentPage, 10) - 1}`;

  const nextPageUrl = `/looppacks/page/${parseInt(currentPage, 10) + 1}`;

  return (
    <div style={{marginTop: "2rem", display: "flex", justifyContent: "center"}}>
    <Stack gap={3} direction="horizontal">
      <div>
        {!prevDisabled && (
          <NextLink href={prevPageUrl}>
            <a>Previous page</a>
          </NextLink>
        )}
      </div>
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <div>
        {!nextDisabled && (
          <NextLink href={nextPageUrl}>
            <a>Next page</a>
          </NextLink>
        )}
      </div>
    </Stack>
    </div>
  );
}