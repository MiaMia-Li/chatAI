import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Edit, FileText, Zap } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Content Analysis",
    description: "Get feedback on your experience, skills, and achievements",
  },
  {
    icon: Edit,
    title: "Writing Improvements",
    description: "Enhance clarity, impact, and professional tone",
  },
  {
    icon: Zap,
    title: "ATS Optimization",
    description: "Make your resume stand out to applicant tracking systems",
  },
];

const ResumeHeader = () => {
  return (
    <div className="text-center space-y-6 max-w-2xl mx-auto mb-8">
      <h1 className="text-3xl font-bold tracking-tight">
        AI-Powered Resume Analysis
      </h1>
      <p className="text-lg text-muted-foreground">
        Upload your resume and let our AI analyze it in seconds. Get
        personalized insights on:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {features.map((feature, index) => {
          const delay = Math.random() * 0.25;
          return (
            // <motion.div
            //   initial={{ opacity: 0, scale: 1, y: 10, x: 0 }}
            //   animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            //   exit={{ opacity: 0, scale: 1, y: 10, x: 0 }}
            //   transition={{
            //     opacity: { duration: 0.1, delay },
            //     scale: { duration: 0.1, delay },
            //     y: { type: "spring", stiffness: 100, damping: 10, delay },
            //   }}
            //   key={feature.title}>
            //   <Card key={index} className="p-4">
            //     <feature.icon className="h-6 w-6 mb-2" />
            //     <h3 className="font-semibold">{feature.title}</h3>
            //     <p className="text-sm text-muted-foreground">
            //       {feature.description}
            //     </p>
            //   </Card>
            // </motion.div>
            <Card key={index} className="p-4">
              <feature.icon className="h-6 w-6 mb-2" />
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ResumeHeader;
