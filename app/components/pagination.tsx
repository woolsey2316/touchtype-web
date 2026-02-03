import { Button, Input, Box } from "@mui/joy";
import { useState } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [leftInputPage, setLeftInputPage] = useState("");
  const [rightInputPage, setRightInputPage] = useState("");
  const [showLeftInput, setShowLeftInput] = useState(false);
  const [showRightInput, setShowRightInput] = useState(false);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleLeftInputSubmit = () => {
    const page = parseInt(leftInputPage, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    setLeftInputPage("");
    setShowLeftInput(false);
  };

  const handleRightInputSubmit = () => {
    const page = parseInt(rightInputPage, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    setRightInputPage("");
    setShowRightInput(false);
  };

  const handleLeftInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLeftInputSubmit();
    } else if (e.key === "Escape") {
      setLeftInputPage("");
      setShowLeftInput(false);
    }
  };

  const handleRightInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRightInputSubmit();
    } else if (e.key === "Escape") {
      setRightInputPage("");
      setShowRightInput(false);
    }
  };

  // Show left "..." if current page > 3
  const showLeftEllipsis = currentPage > 3;
  // Show right "..." if current page < totalPages - 2
  const showRightEllipsis = currentPage < totalPages - 2;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
        justifyContent: "center",
        "& .MuiButton-root, & .MuiToggleButton-root": {
          "&:hover": {
            background: "transparent",
          },
        },
      }}
    >
      {/* Previous page button */}
      <Button
        variant="plain"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        size="sm"
      >
        <svg
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M14 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      {/* First page button */}
      <Button
        variant={currentPage === 1 ? "solid" : "outlined"}
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        size="sm"
        sx={{
          borderColor: (theme) => theme.vars.palette.neutral.solidHoverBg,
        }}
      >
        1
      </Button>

      {/* Left ellipsis / input */}
      {showLeftEllipsis && (
        <>
          {showLeftInput ? (
            <Input
              type="number"
              value={leftInputPage}
              onChange={(e) => setLeftInputPage(e.target.value)}
              onBlur={handleLeftInputSubmit}
              onKeyDown={handleLeftInputKeyPress}
              autoFocus
              size="sm"
              sx={{ width: 60 }}
              placeholder="..."
            />
          ) : (
            <Button
              variant="plain"
              onClick={() => setShowLeftInput(true)}
              size="sm"
              sx={{
                borderColor: (theme) => theme.vars.palette.neutral.solidHoverBg,
              }}
            >
              ...
            </Button>
          )}
        </>
      )}

      {/* Previous page (if not first or second page) */}
      {currentPage > 2 && (
        <Button
          variant="outlined"
          onClick={() => handlePageClick(currentPage - 1)}
          size="sm"
          sx={{
            borderColor: (theme) => theme.vars.palette.neutral.solidHoverBg,
          }}
        >
          {currentPage - 1}
        </Button>
      )}

      {/* Current page (if not first or last) */}
      {currentPage !== 1 && currentPage !== totalPages && (
        <Button
          variant="solid"
          disabled
          size="sm"
          sx={{
            borderColor: (theme) => theme.vars.palette.neutral.solidHoverBg,
          }}
        >
          {currentPage}
        </Button>
      )}

      {/* Next page (if not last or second-to-last page) */}
      {currentPage < totalPages - 1 && (
        <Button
          variant="outlined"
          onClick={() => handlePageClick(currentPage + 1)}
          size="sm"
          sx={{
            borderColor: (theme) => theme.vars.palette.neutral.solidHoverBg,
          }}
        >
          {currentPage + 1}
        </Button>
      )}

      {/* Right ellipsis / input */}
      {showRightEllipsis && (
        <>
          {showRightInput ? (
            <Input
              type="number"
              value={rightInputPage}
              onChange={(e) => setRightInputPage(e.target.value)}
              onBlur={handleRightInputSubmit}
              onKeyDown={handleRightInputKeyPress}
              autoFocus
              size="sm"
              sx={{ width: 60 }}
              placeholder="..."
            />
          ) : (
            <Button
              variant="plain"
              onClick={() => setShowRightInput(true)}
              size="sm"
            >
              ...
            </Button>
          )}
        </>
      )}

      {/* Last page button (if more than 1 page) */}
      {totalPages > 1 && (
        <Button
          variant={currentPage === totalPages ? "solid" : "outlined"}
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          size="sm"
          sx={{
            borderColor: (theme) => theme.vars.palette.neutral.solidHoverBg,
          }}
        >
          {totalPages}
        </Button>
      )}
      {/* Next page button */}
      <Button
        variant="plain"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        size="sm"
      >
        <svg
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M10 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </Box>
  );
};
