"use client";

import { signOut } from "next-auth/react";

export const fetchClient = async (
  input: string | URL | Request,
  init?: RequestInit | undefined
): Promise<Response> => {
  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }



    const response = await fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        ...(getCookie("jwt") && { Authorization: `Bearer ${getCookie("jwt")}` }),
      },
    });

    if(response.status === 401) {
      await signOut()
    }

    return response
};
