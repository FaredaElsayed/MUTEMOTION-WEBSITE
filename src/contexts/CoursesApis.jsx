import { createContext, useReducer, useEffect } from "react";
import { useAuth } from "./Auth";

// const actionTypes = {
//   FETCH_RECOMMENDED: "FETCH_RECOMMENDED",
//   FETCH_BEGINNERS: "FETCH_BEGINNERS",
//   FETCH_POPULAR: "FETCH_POPULAR",
//   FETCH_SUCCESS: "FETCH_SUCCESS",
//   FETCH_ERROR: "FETCH_ERROR",
// };

// Action Types (optional for better readability)
const actionTypes = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  SET_WISHLIST: "SET_WISHLIST",
  TOGGLE_WISHLIST: "TOGGLE_WISHLIST",
};

const initialState = {
  recommendedCourses: [],
  beginnerCourses: [],
  popularCourses: [],
  forKids: [],
  aslAdults: [],
  wishlist: [], // Initialize wishlist in state
  wishlisted: false,
  loading: false,
  error: null,
};
// Reducer Function
const courseReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    default:
      return state;
  }
};

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!token) return; // Exit early if no token

      try {
        const [
          recommendedRes,
          beginnerRes,
          popularRes,
          forKidsRes,
          aslAdultsRes,
        ] = await Promise.all([
          fetch(
            "https://mutemotion.onrender.com/api/courses?category=Recommended For You",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          fetch(
            "https://mutemotion.onrender.com/api/courses?category=ASL For Beginners",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          fetch(
            "https://mutemotion.onrender.com/api/courses?category=Most Popular",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          fetch(
            "https://mutemotion.onrender.com/api/courses?category=For Kids",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          fetch(
            "https://mutemotion.onrender.com/api/courses?category=For Adults",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);
        const [
          recommendedCourses,
          beginnerCourses,
          popularCourses,
          forKids,
          aslAdults,
        ] = await Promise.all([
          recommendedRes.json(),
          beginnerRes.json(),
          popularRes.json(),
          forKidsRes.json(),
          aslAdultsRes.json(),
        ]);

        dispatch({
          type: actionTypes.FETCH_SUCCESS,
          payload: {
            recommendedCourses,
            beginnerCourses,
            popularCourses,
            forKids,
            aslAdults,
          },
        });
      } catch (error) {
        dispatch({
          type: actionTypes.FETCH_ERROR,
          payload: error.message,
        });
      }
    };

    if (token) {
      fetchCourses();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const fetchWishlistData = async () => {
        try {
          const response = await fetch(
            "https://mutemotion.onrender.com/api/wishlist",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch wishlist");
          }

          const wishlistData = await response.json();
          dispatch({ type: actionTypes.SET_WISHLIST, payload: wishlistData });
        } catch (error) {
          console.error("Failed to fetch wishlist:", error);
        }
      };

      fetchWishlistData();
    }
  }, [token]);
  return (
    <CourseContext.Provider value={{ state }}>
      {children}
    </CourseContext.Provider>
  );
};
