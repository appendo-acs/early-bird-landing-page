import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-97ea5888/health", (c) => {
  return c.json({ status: "ok" });
});

// Early bird registration endpoint
app.post("/make-server-97ea5888/register", async (c) => {
  try {
    const body = await c.req.json();
    const { fullName, email, city, currentStatus, timestamp, referralCode } = body;

    // Validate required fields
    if (!fullName || !email || !currentStatus) {
      return c.json(
        { error: "Full name, email, and current status are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create a unique key for the registration
    const registrationKey = `earlybird:${email.toLowerCase()}`;

    // Check if email already registered
    const existing = await kv.get(registrationKey);
    if (existing) {
      return c.json(
        { 
          success: true, 
          message: "You're already registered!",
          alreadyRegistered: true,
          referralCode: (existing as any).referralCode
        },
        { status: 200 }
      );
    }

    // Generate unique referral code (6 characters: first name + random)
    const firstName = fullName.split(' ')[0].toUpperCase();
    const randomCode = Math.random().toString(36).substring(2, 5).toUpperCase();
    const userReferralCode = `${firstName.substring(0, 3)}${randomCode}`;

    // Track referral if provided
    let referredBy = null;
    if (referralCode) {
      // Find who owns this referral code
      const allUsers = await kv.getByPrefix("earlybird:");
      const referrer = allUsers.find((u: any) => u.referralCode === referralCode);
      
      if (referrer) {
        referredBy = (referrer as any).email;
        // Increment referrer's count
        const referrerKey = `earlybird:${(referrer as any).email}`;
        const referrerData = await kv.get(referrerKey) as any;
        await kv.set(referrerKey, {
          ...referrerData,
          referralCount: (referrerData.referralCount || 0) + 1,
        });
      }
    }

    // Store the registration
    const registrationData = {
      fullName,
      email: email.toLowerCase(),
      city: city || '',
      currentStatus,
      timestamp: timestamp || new Date().toISOString(),
      source: "early-bird-landing",
      referralCode: userReferralCode,
      referredBy: referredBy,
      referralCount: 0,
    };

    await kv.set(registrationKey, registrationData);

    // Also store in a list for easy retrieval
    const listKey = `earlybird:list:${timestamp}`;
    await kv.set(listKey, registrationData);

    console.log(`New early bird registration: ${email} (${currentStatus}) from ${city || 'Unknown'}${referredBy ? ` - Referred by ${referredBy}` : ''}`);

    return c.json(
      { 
        success: true, 
        message: "Successfully registered for early bird access!",
        referralCode: userReferralCode
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return c.json(
      { error: "Failed to process registration. Please try again." },
      { status: 500 }
    );
  }
});

// Get all registrations (for admin)
app.get("/make-server-97ea5888/registrations", async (c) => {
  try {
    const registrations = await kv.getByPrefix("earlybird:list:");
    return c.json({ 
      success: true, 
      count: registrations.length,
      registrations 
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return c.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
});

// Get referral leaderboard (top referrers)
app.get("/make-server-97ea5888/leaderboard", async (c) => {
  try {
    const allUsers = await kv.getByPrefix("earlybird:");
    
    // Filter and sort by referral count
    const leaderboard = allUsers
      .filter((u: any) => u.referralCount > 0)
      .sort((a: any, b: any) => b.referralCount - a.referralCount)
      .slice(0, 10) // Top 10
      .map((u: any) => ({
        name: u.fullName,
        referralCount: u.referralCount,
        city: u.city,
      }));
    
    return c.json({ 
      success: true, 
      leaderboard 
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return c.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
});

// Get user referral stats
app.get("/make-server-97ea5888/referral-stats/:email", async (c) => {
  try {
    const email = c.req.param('email').toLowerCase();
    const userData = await kv.get(`earlybird:${email}`) as any;
    
    if (!userData) {
      return c.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    return c.json({ 
      success: true, 
      referralCode: userData.referralCode,
      referralCount: userData.referralCount || 0,
    });
  } catch (error) {
    console.error("Error fetching referral stats:", error);
    return c.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
});

Deno.serve(app.fetch);