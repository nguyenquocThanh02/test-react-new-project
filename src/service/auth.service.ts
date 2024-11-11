import { User } from "@/types/user.type";

export const getProfile = async () => {
  const accessToken = localStorage.getItem("access-token");

  if (accessToken) {
    const response: User = {
      id: "127d0eee-a397-4e40-994d-0252ab30b0cb",
      email: "shiki@mailinator.com",
      firstName: "Shiki",
      lastName: "Gotaka",
      permissions: [
        {
          name: "Dashboard",
          code: "DASHBOARD",
          ordering: 0,
          isEnable: false,
        },
        {
          name: "Products",
          code: "PRODUCTS",
          ordering: 1,
          isEnable: true,
        },
        {
          name: "Customers",
          code: "CUSTOMERS",
          ordering: 2,
          isEnable: true,
        },
        {
          name: "Reviews",
          code: "REVIEWS",
          ordering: 3,
          isEnable: true,
        },
        {
          name: "Service Histories",
          code: "SERVICES_HISTORIES",
          ordering: 4,
          isEnable: true,
        },
      ],
    };
    return response;
  }

  throw new Error("Access token is not available");
};
