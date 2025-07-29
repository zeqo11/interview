import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateTempId } from "./generateTempId";

describe("generateTempId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns a UUID when crypto.randomUUID is available", () => {
    const mockUUID = "123e4567-e89b-12d3-a456-426614174000";
    const mockRandomUUID = vi.fn().mockReturnValue(mockUUID);

    Object.defineProperty(global, "crypto", {
      value: { randomUUID: mockRandomUUID },
      writable: true,
    });

    const result = generateTempId();

    expect(result).toBe(mockUUID);
    expect(mockRandomUUID).toHaveBeenCalledOnce();
  });

  it("returns a fallback ID when crypto is not available", () => {
    Object.defineProperty(global, "crypto", {
      value: undefined,
      writable: true,
    });

    const result = generateTempId();

    expect(result).toMatch(/^tmp-[a-z0-9]+$/);
  });
});
