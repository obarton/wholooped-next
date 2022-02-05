import Link from "next/link";

export default function Pagination({ totalPages, currentPage, prevDisabled, nextDisabled }: any) {

  const prevPageUrl =
    currentPage === "2"
      ? "/artists"
      : `/artists/page/${parseInt(currentPage, 10) - 1}`;

  const nextPageUrl = `/artists/page/${parseInt(currentPage, 10) + 1}`;

  return (
    <ol>
      <li>
        {prevDisabled && <span>Previous page</span>}
        {!prevDisabled && (
          <Link href={prevPageUrl}>
            <a>Previous page</a>
          </Link>
        )}
      </li>
      <li>
        Page {currentPage} of {totalPages}
      </li>
      <li>
        {nextDisabled && <span>Next page</span>}
        {!nextDisabled && (
          <Link href={nextPageUrl}>
            <a>Next page</a>
          </Link>
        )}
      </li>
    </ol>
  );
}