import React, { useEffect, useState } from "react";
import service from "../appwrite/mainconfig";
import { Container, PostCard } from "../components/index";

const AllPosts = () => {
  const [posts, setposts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      setisLoading(true);
      if (posts) {
        setposts(posts.documents);
        setisLoading(false);
        // setposts(posts)
      }
    });
  }, []);

  // console.log("All post jsx",posts)

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {isLoading ? (
            <div className="flex  w-full  justify-center items-center h-[60vh]">
              <h1 className="w-full font-semibold text-center mx-auto text-3xl text-blue-300 ">
                Loading...
              </h1>
            </div>
          ) : (
            posts.map((each) => {
              // console.log("each card",each)
              return (
                <div
                  key={each.$id}
                  className="p-2 flex flex-wrap  min-w-[182px] w-[200px] max-w-[230px]"
                >
                  <PostCard {...each} />
                </div>
              );
            })
          )}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
