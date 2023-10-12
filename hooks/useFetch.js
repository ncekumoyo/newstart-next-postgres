"use client";
import React, { useCallback, useState } from "react";

const useFetch = (route) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const doFetch = useCallback(
    ({ method, token, body }) => {
      setLoading(true);
      fetch(
        route,
        //{ cache: "no-store" },
        //{ next: { revalidate: 3 } },
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        }
      )
        .then((res) => {
          //console.log(res);
          return res.json();
        })
        .then((result) => {
          //console.log(result);
          if (result?.data) {
            setData(result.data);
            setErr(null);
          } else {
            setErr(result.error);
            setData(null);
          }
        })
        .catch((e) => {
          setErr(e.message);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [route]
  );

  return { data, loading, err, setErr, doFetch };
};

export default useFetch;
