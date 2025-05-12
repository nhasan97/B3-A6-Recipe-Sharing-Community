import Container from "@/src/components/layouts/Container";
import PageTitle from "@/src/components/shared/PageTitle";
import PurposeSection from "./components/PurposeSection";
import ValuesSection from "./components/ValuesSection";
import TeamSection from "./components/TeamSection";
import HistoryAndMilestoneSection from "./components/HistoryAndMilestoneSection";
import ContactInfoSection from "./components/ContactInfoSection";

const AboutUsPage = async () => {
  const title = {
    mainTitle: "About Us",
    subTitle: "Who we are",
  };

  return (
    <Container>
      <div className="w-full min-h-screen">
        <PageTitle title={title} />

        <div className="flex flex-col gap-16">
          {/* //// Our purpose //// */}
          <PurposeSection />

          {/* //// Our Values //// */}
          <ValuesSection />

          {/* //// Our team //// */}
          <TeamSection />

          {/* //// Our history and milestone //// */}
          <HistoryAndMilestoneSection />

          {/* //// Contact Info //// */}
          <ContactInfoSection />
        </div>
      </div>
    </Container>
  );
};

export default AboutUsPage;
