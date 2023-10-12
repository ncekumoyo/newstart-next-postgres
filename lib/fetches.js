export async function executeFetch(route) {
  try {
    const res = await fetch(
      `http://localhost:3000/${route}`,
      { cache: "no-store" },
      //{ next: { revalidate: 3 } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (e) {
    return { error: e.message };
  }
}
