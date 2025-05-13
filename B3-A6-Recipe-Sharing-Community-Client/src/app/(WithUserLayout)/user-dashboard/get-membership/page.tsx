"use client";

import FXForm from "@/src/components/UI/form/FXForm";
import FXInput from "@/src/components/UI/form/FXInput";
import DashboardContainer from "@/src/components/layouts/DashboardContainer";
import DashboardPageTitle from "@/src/components/shared/DashboardPageTitle";
import LoadingSection from "@/src/components/shared/LoadingSection";
import { useUser } from "@/src/context/user.provider";
import { usePayment } from "@/src/hooks/payment.hook";
import { logout } from "@/src/services/AuthService";
import { IUser } from "@/src/types/user.type";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../../../../styles/carousel.css";

const GetMembershipPage = () => {
  const {
    setIsLoading: userLoading,
    isLoading: loadingLoggedInUser,
    user: loggedInUser,
  } = useUser();
  const router = useRouter();

  const { mutate: mutatePayment, isPending } = usePayment();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    toast.warning("Are you sure to proceed?", {
      action: {
        label: "Yes",
        onClick: () => {
          try {
            mutatePayment(loggedInUser?._id as string, {
              onSuccess: () => {
                logout();
                userLoading(true);
                router.push("/login");
              },
            });
          } catch (err: any) {
            toast.error(err.data.message, { duration: 2000 });
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Cancelled!", { duration: 2000 }),
      },
    });
  };

  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const title = {
    mainTitle: "Get Membership",
  };

  return (
    <div className="h-screen bg-[url('/assets/images/dashboard-recipes-bg-mobileTab-2.png')] xl:bg-[url('/assets/images/get-membership-bg-pc.png')] bg-cover bg-center bg-no-repeat">
      <DashboardContainer>
        <DashboardPageTitle title={title} />

        {loadingLoggedInUser ? (
          <LoadingSection />
        ) : (
          <div className="w-full h-full flex flex-col xl:flex-row gap-6 overflow-y-auto">
            <div className="w-full xl:w-1/2 xl:h-full flex flex-col justify-center items-center gap-6 rounded-lg">
              <div className="w-full xl:h-[60%] bg-white flex flex-col justify-center items-center gap-3 p-5 text-center shadow-xl rounded-lg">
                <Image
                  src={"/assets/icons/premium.png"}
                  alt=""
                  className="w-[100px] h-[80px] md:w-[200px] md:h-[150px] mx-auto"
                />
                <h1 className="text-red-700 text-lg md:text-2xl font-semibold">
                  Unlock Premium for Just $14! 🎉
                </h1>

                <p className="max-w-[350px] text-[#696969] text-base">
                  Become a Pro Member today and elevate your experience! For
                  just $14/month, you’ll gain exclusive access to all our
                  premium features.
                </p>
              </div>

              {/* //// premium features //// */}
              <div className="w-full xl:h-[40%] bg-white flex flex-col justify-center items-center p-5 rounded-lg shadow-xl">
                <h1 className="w-full text-lg md:text-2xl text-left font-semibold mb-6">
                  Premium Features
                </h1>
                <div className="w-full space-y-1">
                  <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                      <div className="embla__slide">
                        <div className="text-center p-3 rounded-lg bg-[#6C6555] text-white">
                          <h3 className="text-base font-semibold">
                            ✨ Ad-Free Browsing
                          </h3>
                          <p className="text-base">
                            Enjoy a seamless, distraction-free experience
                          </p>
                        </div>
                      </div>
                      <div className="embla__slide">
                        <div className="text-center p-3 rounded-lg bg-[#6C6555] text-white">
                          <h3 className="text-base font-semibold">
                            ✨ Exclusive Content
                          </h3>
                          <p className="text-base">
                            Get early access to top-tier resources and guides
                          </p>
                        </div>
                      </div>
                      <div className="embla__slide">
                        <div className="text-center p-3 rounded-lg bg-[#6C6555] text-white">
                          <h3 className="text-base font-semibold">
                            ✨ Advanced Filtering
                          </h3>
                          <p className="text-base">
                            Find exactly what you need with enhanced search and
                            filter options
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-1/2 xl:h-full bg-black/20 backdrop-blur-md flex flex-col justify-center p-5 xl:p-10 rounded-lg shadow-xl">
              <h1 className="text-[#121213] text-lg md:text-2xl font-semibold mb-6">
                Become a PRO Memeber
              </h1>

              <FXForm defaultValues={loggedInUser as IUser} onSubmit={onSubmit}>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl">
                    <FXInput label="Name" name="name" readOnly={true} />
                  </div>

                  <div className="bg-white rounded-xl">
                    <FXInput label="Email" name="email" readOnly={true} />
                  </div>

                  <div className="bg-white rounded-xl">
                    <FXInput
                      label="Mobile Number"
                      name="mobileNumber"
                      readOnly={true}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-700 text-white"
                    size="lg"
                    radius="lg"
                    isDisabled={loggedInUser?.userType === "PRO"}
                  >
                    {isPending ? "Proceeding..." : "Proceed"}
                  </Button>
                </div>
              </FXForm>
            </div>
          </div>
        )}

        {/* </div> */}
      </DashboardContainer>
    </div>
  );
};

export default GetMembershipPage;
