import React, { useEffect, useState } from "react";
import service from "../appwrite/mainconfig";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setposts] = useState([]);
  const mystatus = useSelector((state) => state.status);
 
  console.log("my home pr jo state hai ", mystatus);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        // console.log("my post",posts)
        setposts(posts.documents);
      }
    });
  }, []);

  if (mystatus === false) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <div className="w-[186px] bg-gray-300 border-[1px] border-rose-700 rounded-xl min-h-[245px] p-4">
                <div className="w-full justify-center mb-4">
                  <img
                    src="./blogPhoto.jpg"
                    alt="react" //yaha ye image ki id khud le lega
                    className="rounded-xl min-h-[120px] h-[130px]"
                  />
                </div>
                <h2 className="text-xl font-bold">
                  Create Beautiful Blog Articles
                </h2>
              </div>
              <h1 className="text-2xl mt-5 font-bold duration-700 hover:text-gray-700">
                Login to create & read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
            <h1 className="text-center underline text-2xl font-semibold my-3">All active Blogs are shown here</h1>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4 max-w-[230px] max-sm:w-[180px]">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
};

export default Home;
