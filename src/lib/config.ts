import fs from "fs";
import path from "path";

// Load config from JSON file
const configPath = path.join(process.cwd(), "config.json");
const configFile = fs.readFileSync(configPath, "utf8");
const config = JSON.parse(configFile);

export interface OTPConfig {
  code_expiry: number;
  cooldown_expiry: number;
  code_length: number;
  email: {
    subject: string;
    template: string;
  };
}

export interface RedisConfig {
  default_ttl: number;
}

export interface EmailConfig {
  from_name: string;
  from_email: string;
}

export interface AppConfig {
  otp: OTPConfig;
  redis: RedisConfig;
  email: EmailConfig;
}

export const appConfig: AppConfig = config;

// Helper function to get OTP config
export const getOTPConfig = (): OTPConfig => appConfig.otp;

// Helper function to get Redis config
export const getRedisConfig = (): RedisConfig => appConfig.redis;

// Helper function to get Email config
export const getEmailConfig = (): EmailConfig => appConfig.email;
