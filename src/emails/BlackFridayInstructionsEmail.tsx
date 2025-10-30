import {
   Html,
   Head,
   Preview,
   Body,
   Container,
   Section,
   Text,
   Button,
   Heading,
} from "@react-email/components";

interface BlackFridayInstructionsEmailProps {
   customerName?: string;
   bonusActivationUrl: string;
   friendGiftUrl: string;
   offerEndDate: string;
   companyName?: string;
}

export default function BlackFridayInstructionsEmail({
   customerName,
   bonusActivationUrl,
   friendGiftUrl,
   offerEndDate,
   companyName = "Yrityksen nimi",
}: BlackFridayInstructionsEmailProps) {
   return (
      <Html lang="fi">
         <Head />
         <Preview>
            Kiitos ostoksestasi! Näin aktivoit oman ja ystäväsi ilmaisen
            kurssin.
         </Preview>
         <Body
            style={{
               backgroundColor: "#0a0a0a",
               color: "#ffffff",
               fontFamily: "Arial, sans-serif",
               margin: 0,
               padding: 0,
            }}
         >
            <Container
               style={{
                  backgroundColor: "#1e1e1e",
                  maxWidth: "480px",
                  margin: "0 auto",
                  padding: "24px 16px",
                  textAlign: "left",
               }}
            >
               <Section>
                  <Heading
                     as="h1"
                     style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        marginBottom: "16px",
                        color: "#ffffff",
                     }}
                  >
                     Ohjeet ilmaisten Black Friday -kurssiesi aktivoimiseen
                  </Heading>
               </Section>

               <Section>
                  <Text
                     style={{
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#f0f0f0",
                     }}
                  >
                     Hei{customerName ? ` ${customerName}` : ""},
                     <br />
                     <br />
                     Kiitos, että osallistuit Black Friday -kampanjaamme!
                     <br />
                     Kuten luvattiin, saat nyt kaksi lisäkurssia ilman
                     lisämaksua – yhden itsellesi ja yhden kaverillesi.
                  </Text>
               </Section>

               <Section style={{ marginTop: "24px" }}>
                  <Heading
                     as="h2"
                     style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "16px",
                        color: "#ffffff",
                     }}
                  >
                     Toimi näin:
                  </Heading>

                  <div
                     style={{
                        fontSize: "14px",
                        color: "#f0f0f0",
                     }}
                  >
                     <div style={{ margin: "32px 0px" }}>
                        <strong style={{ color: "#ffffff" }}>1.</strong>{" "}
                        <Heading
                           as="h3"
                           style={{
                              display: "inline",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#ffffff",
                              marginLeft: "4px",
                           }}
                        >
                           Aktivoi oma ilmainen lisäkurssisi
                        </Heading>
                        <Text
                           style={{
                              marginTop: "6px",
                              marginBottom: "12px",
                              color: "#f0f0f0",
                           }}
                        >
                           Klikkaa alla olevaa painiketta ja valitse haluamasi
                           lisäkurssi.
                        </Text>
                        <Button
                           href={bonusActivationUrl}
                           style={{
                              backgroundColor: "#ff0000",
                              color: "#ffffff",
                              padding: "12px 20px",
                              borderRadius: "4px",
                              textDecoration: "none",
                              fontWeight: "bold",
                              display: "inline-block",
                              flex: 1,
                           }}
                        >
                           Aktivoi oma kurssi
                        </Button>
                     </div>

                     <div>
                        <strong style={{ color: "#ffffff" }}>2.</strong>{" "}
                        <Heading
                           as="h3"
                           style={{
                              display: "inline",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#ffffff",
                              marginLeft: "4px",
                           }}
                        >
                           Jaa ilmainen kurssi kaverillesi
                        </Heading>
                        <Text
                           style={{
                              marginTop: "6px",
                              marginBottom: "12px",
                              color: "#f0f0f0",
                           }}
                        >
                           Lähetä alla oleva linkki ystävällesi. Hän voi
                           aktivoida oman kurssinsa Black Friday -kampanjan
                           aikana (<strong>{offerEndDate}</strong> mennessä).
                        </Text>
                        <Text
                           style={{
                              wordBreak: "break-all",
                              color: "#ff4444",
                              fontSize: "14px",
                           }}
                        >
                           <a
                              href={friendGiftUrl}
                              style={{
                                 color: "#ff4444",
                                 textDecoration: "underline",
                                 wordBreak: "break-all",
                              }}
                           >
                              {friendGiftUrl}
                           </a>
                        </Text>
                     </div>
                  </div>
               </Section>

               <Section style={{ marginTop: "32px" }}>
                  <Text
                     style={{
                        fontSize: "13px",
                        color: "#cccccc",
                     }}
                  >
                     Tarjous on voimassa <strong>{offerEndDate}</strong> saakka.
                     <br />
                     Muista aktivoida kurssit ennen määräaikaa.
                  </Text>
               </Section>

               <Section style={{ marginTop: "28px" }}>
                  <Text style={{ fontSize: "13px", color: "#bbbbbb" }}>
                     Kiitos, että olet mukana!
                     <br />
                     Ystävällisin terveisin, <br />
                     <strong>{companyName}</strong>
                  </Text>
                  <Text
                     style={{
                        fontSize: "11px",
                        color: "#777777",
                        marginTop: "20px",
                     }}
                  >
                     © {new Date().getFullYear()} {companyName}. Kaikki oikeudet
                     pidätetään.
                  </Text>
               </Section>
            </Container>
         </Body>
      </Html>
   );
}

BlackFridayInstructionsEmail.PreviewProps = {
   customerName: "Matti",
   bonusActivationUrl: "https://example.com/bonus",
   friendGiftUrl: "https://example.com/kaveri",
   offerEndDate: "30.11.2025",
   companyName: "HyvinvointiHeimo Oy",
} as BlackFridayInstructionsEmailProps;
