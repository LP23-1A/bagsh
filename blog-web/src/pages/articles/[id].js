import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";

const customAxios = async (...args) => {
  try {
    const res = await axios(...args);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export default function ContactUs() {
  const router = useRouter();
  const expenseId = router.query.id

  const { data, error, isLoading } = useSWR(
    expenseId ? ('https://dev.to/api/articles/' + expenseId) : null,
    customAxios
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return <main>{data?.data?.title}</main>;
}
