import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

interface HomeProps {
  searchParams: { [key: string]: string | undefined };
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const currentUserData = await currentUser();

      if (!currentUserData) {
        return;
      }

      setUser(currentUserData);

      const userInformation = await fetchUser(currentUserData.id);
      if (!userInformation?.onboarded) {
        redirect("/onboarding");
        return;
      }

      setUserInfo(userInformation);

      const result = await fetchPosts(
        searchParams.page ? +searchParams.page : 1,
        30
      );

      setPosts(result.posts);
      setIsFetching(false);
    }

    fetchData();
  }, [searchParams]);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {isFetching ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p className="no-result">No gdol found</p>
        ) : (
          <>
            {posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={!isFetching && posts.length > 0}
      />
    </>
  );
};

export default Home;
