import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/shared/icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[];
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

// subcriptions
export type SubscriptionPlan = {
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
    stripeCurrentPeriodEnd: number;
    isPaid: boolean;
    interval: "month" | "year" | null;
    isCanceled?: boolean;
  };

// compare plans
export type ColumnType = string | boolean | null;
export type PlansRow = { feature: string; tooltip?: string } & {
  [key in (typeof plansColumns)[number]]: ColumnType;
};

// landing sections
export type InfoList = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
};

export type InfoLdg = {
  title: string;
  image: string;
  description: string;
  list: InfoList[];
};

export type FeatureLdg = {
  title: string;
  description: string;
  link: string;
  icon: keyof typeof Icons;
};

export type TestimonialType = {
  name: string;
  job: string;
  image: string;
  review: string;
};

// 类型定义
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface UploadedFile {
  url: string;
  name: string;
  contentType: string;
  content: string;
}

export type ResumeAnalysis = z.infer<typeof resumeAnalysisSchema>;

export const resumeAnalysisSchema = z.object({
  totalScore: z.number().min(0).max(100),
  scoreCategories: z.array(
    z.object({
      name: z.string(),
      score: z.number().min(0).max(100),
    })
  ),
  sections: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      suggestions: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          priority: z.enum(["high", "medium", "low"]),
        })
      ),
    })
  ),
  basicInfo: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    education: z.string(),
    summary: z.string().optional(),
  }),
  workExperience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      period: z.string(),
      description: z.string(),
      achievements: z.array(z.string()).optional(),
    })
  ),
  skills: z.array(z.string()),
});
