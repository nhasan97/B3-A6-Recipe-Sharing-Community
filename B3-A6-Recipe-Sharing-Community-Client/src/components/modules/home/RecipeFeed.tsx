import React from "react";
import RecipeFeedCard from "../../UI/RecipeFeedCard";
import { IRecipe } from "@/src/types/recipe.type";
import NoData from "../../shared/NoData";
import InfiniteScroll from "react-infinite-scroll-component";

const RecipeFeed = ({
  recipeData,
  fetchData,
  hasMore,
}: {
  recipeData: IRecipe[];
  fetchData: () => void;
  hasMore: boolean;
}) => {
  return (
    <div className="mx-auto my-3">
      {recipeData?.length ? (
        <InfiniteScroll
          dataLength={recipeData?.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          {recipeData?.map((recipe: IRecipe) => (
            <RecipeFeedCard key={recipe._id} recipe={recipe} />
          ))}
        </InfiniteScroll>
      ) : (
        <NoData text={"No Recipes Found"} />
      )}
    </div>
  );
};

export default RecipeFeed;
