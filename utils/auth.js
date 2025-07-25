// // frntend/utils/auth.js

// export const parseJwt = (token) => {
//   try {
//     return JSON.parse(atob(token.split('.')[1]));
//   } catch (e) {
//     return null;
//   }
// };

// export const isTokenExpired = (token) => {
//   const decoded = parseJwt(token);
//   if (!decoded || !decoded.exp) return true; // Token is expired if there's no exp field
//   return decoded.exp * 1000 < Date.now(); // Convert exp to milliseconds and check if expired
// };

// export const isAuthenticated = async () => {
//   const token = localStorage.getItem("access_token");

//   if (!token) {
//     return { valid: false, message: "Please Login!" };
//   }

//   // Check if the token is expired
//   if (isTokenExpired(token)) {
//     return { valid: false, message: "Session expired, please login again." };
//   }

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/verify_token`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ access_token: token, token_type: "Bearer" }),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       return {
//         valid: false,
//         message: errorData.detail || "Token validation failed",
//       };
//     }

//     return { valid: true, message: "" };
//   } catch (error) {
//     // console.error("Error validating token:", error);
//     return {
//       valid: false,
//       message: "An error occurred while validating the token",
//     };
//   }
// };



// frontend/utils/auth.js

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return true;
  return decoded.exp * 1000 < Date.now();
};


//  Final: Role detection logic
export const getUserTeamRole = (token = null) => {
  const accessToken = token || localStorage.getItem("access_token");
  if (!accessToken) return null;

  const decoded = parseJwt(accessToken);
  if (!decoded) return null;

  // Priority 1: role field
  if (decoded.role === "admin") return "admin";

  // Priority 2: team field fallback
  if (decoded.team === "admin") return "admin";

  // Priority 3: domain or email fallback
  const email = decoded.sub || decoded.email;
  const allowedDomains = ["@whitebox-learning.com", "@innova-path.com"];
  const allowedEmails = ["admin", "admin@whitebox-learning.com", "admin1@innova-path.com"];

  if (email) {
    const isAllowedDomain = allowedDomains.some(domain => email.endsWith(domain));
    const isAllowedEmail = allowedEmails.includes(email.toLowerCase());

    if (isAllowedDomain || isAllowedEmail) {
      return "admin";
    }
  }

  return "candidate";
};

export const isAuthenticated = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return { valid: false, message: "Please Login!" };
  }

  if (isTokenExpired(token)) {
    return { valid: false, message: "Session expired, please login again." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/verify_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: token, token_type: "Bearer" }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        valid: false,
        message: errorData.detail || "Token validation failed",
      };
    }

    return { valid: true, message: "" };
  } catch (error) {
    return {
      valid: false,
      message: "An error occurred while validating the token",
    };
  }
};
