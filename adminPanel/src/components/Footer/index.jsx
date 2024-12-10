import { Layout } from "antd";
import { StyledFooterSection } from "./styles";

export const FooterSection = () => {
  const { Footer } = Layout;
  return (
    <StyledFooterSection>
      <Layout>
        <Footer>
        
          <div className="privacy-tab">
            <div className="copyright">
              <p className="font-poppins500 font-grey">Privacy Policy</p>
            </div>
            <div className="copyright">
              <img src="/images/dotIcon.svg" alt="" />
              <p className="font-poppins500 font-grey">Terms & Condition</p>
            </div>
          </div>
        </Footer>
      </Layout>
    </StyledFooterSection>
  );
};
