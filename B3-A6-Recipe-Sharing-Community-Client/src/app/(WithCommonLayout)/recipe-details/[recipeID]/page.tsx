import Container from "@/src/components/layouts/Container";
import CommentsSection from "@/src/components/modules/recipeDetailsPage/CommentsSection";
import RecipeDetails from "@/src/components/modules/recipeDetailsPage/RecipeDetails";
import axiosInstance from "@/src/lib/AxiosInstance";
import React from "react";

const RecipeDetailsPage = async ({ params }: { params: any }) => {
  const { data: recipeData } = await axiosInstance.get(
    `/recipes/${params.recipeID}`
  );
  const { data: commentData } = await axiosInstance.get(
    `/comments/${params.recipeID}`
  );

  return (
    <Container>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3 overflow-y-auto border">
          <RecipeDetails recipeData={recipeData} />
        </div>
        <div className="col-span-2 border">
          <CommentsSection
            recipeId={recipeData?.data?._id}
            commentData={commentData}
          />
        </div>
      </div>
    </Container>
  );
};

export default RecipeDetailsPage;
