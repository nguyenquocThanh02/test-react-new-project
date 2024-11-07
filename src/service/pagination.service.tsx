import { FilterBuilder, FilterOperationType } from "@chax-at/prisma-filter-common";

/**
 * Hàm xây dựng query string cho API hoặc Prisma với các tham số lọc và phân trang
 * @param limit - Số lượng kết quả tối đa
 * @param offset - Số lượng kết quả bắt đầu từ vị trí nào
 * @param filter - Danh sách các bộ lọc cần áp dụng
 * @param order - Danh sách các trường cần sắp xếp và hướng sắp xếp
 * @returns query string - Chuỗi truy vấn được tạo ra từ các tham số đầu vào
 */
export const buildQueryString = (
  limit: number,
  offset: number,
  filter: { field: string; type: FilterOperationType; value: any }[],
  order: { field: string; dir: "asc" | "desc" }[]
): string => {
  // Sử dụng FilterBuilder để xây dựng query string từ các tham số
  const filterQueryString = FilterBuilder.buildFilterQueryString({
    limit,
    offset,
    filter,
    order,
  });

  // Trả về kết quả query string đã được xây dựng
  return filterQueryString;
};
