import { TOKEN_EXPIRATION_TIME } from "../constants";
import cron from "node-cron";
import Employer from "../models/employers.schema";
import Seeker from "../models/seekers.schema";

cron.schedule("0 0 * * *", async () => {
  const expirationDate = new Date(Date.now() - TOKEN_EXPIRATION_TIME);

  await Employer.deleteMany({
    emailVerified: false,
    verificationExpiration: { $lt: expirationDate },
  });
  await Seeker.deleteMany({
    emailVerified: false,
    verificationExpiration: { $lt: expirationDate },
  });
});
