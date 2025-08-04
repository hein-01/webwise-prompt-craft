import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Wand2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PromptGenerator = () => {
  const [activeTab, setActiveTab] = useState("ui");
  const [copied, setCopied] = useState(false);
  const [editablePrompt, setEditablePrompt] = useState("");
  const promptTextareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    do: "",
    what: "",
    how: "",
    condition: "",
    action: "",
    additional: ""
  });

  // Functionality form state
  const [functionalityData, setFunctionalityData] = useState({
    listings: [],
    searchFiltering: [],
    organizeBy: "",
    organizeCategories: [],
    detailsFor: "",
    detailsWith: [],
    registerFor: [],
    registrationOptions: [],
    securityConsiderations: [],
    additional: []
  });

  // Predefined options
  const doOptions = ["Make", "Add", "Change", "Delete"];
  const whatOptions = ["Button", "Input field", "Navigation menu", "Header", "Footer", "Card", "Color"];
  const howOptions = ["Subtly rise up", "Fade in smoothly", "Slide from left", "Scale up gently"];
  const conditionOptions = ["When", "If", "After", "Before"];
  const actionOptions = ["You move your mouse over them", "You click on them", "The page loads", "You scroll down"];
  const additionalOptions = [
    "Please don't make any changes to its width or height",
    "Make sure you keep the same dimensions regardless of screen sizes",
    "Keep the original color scheme",
    "Maintain accessibility standards"
  ];

  // Functionality options
  const listingsOptions = [
    "Company profiles with name",
    "description",
    "contact info", 
    "website",
    "hours"
  ];

  const searchFilteringOptions = [
    "location",
    "category", 
    "name",
    "services offered"
  ];

  const organizeOptions = [
    "businesses",
    "services",
    "candidates",
    "vendors/sellers",
    "courses"
  ];

  const organizeCategoriesOptions = [
    "product types(women fashion, men fashion, kids fashion, heavy equipments)",
    "All",
    "Random", 
    "Nearby",
    "Restaurants",
    "Healthcare",
    "Retail"
  ];

  const detailsForOptions = [
    "Products",
    "Businesses",
    "Vendors",
    "Sellers",
    "Services",
    "Service Providers"
  ];

  const detailsWithOptions = [
    "photos",
    "videos",
    "full descriptions",
    "social links",
    "ratings",
    "comments",
    "price",
    "website link",
    "verified badge"
  ];

  const registerForOptions = [
    "regular user",
    "business owner",
    "seller",
    "vendor",
    "admin user"
  ];

  const registrationOptionsData = [
    "email/password signup",
    "phone/OTP login(Ensure to Remember the credentials for 30 days",
    "Username/Password Signup(Create a clear and simple process for users to check username availability.)",
    "Google social login",
    "X social login",
    "Facebook social login",
    "Phone Number + OTP(First time only) + Password (Database query: Check if \"Phone Number\" already Exists -> Yes(Go to \"Enter Password\"), No (Go to \"Phone Number\" with \"OTP\" -> then \"Enter Password\")",
    "Password reset via email/OTP(Ensure to send the code only, No reset link)",
    "Two-factor authentication for business accounts",
    "Use Secure login sessions with appropriate timeouts"
  ];

  const securityOptions = [
    "Password strength requirements is minimum 8 characters",
    "Rate limiting on login is 5 attempts",
    "Secure password storage (hashing)",
    "Protected routes based on authentication status"
  ];

  const functionalityAdditionalOptions = [
    "Begin with a homepage and listing layout first, and then set up the database structure using Supabase",
    "Set up the database structure using Supabase first and then continue to design home page and layout",
    "Suggest any Tool that you can provide to detect and prevent spam listings and fake reviews."
  ];

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFunctionalityChange = (field: string, value: string | string[]) => {
    setFunctionalityData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePrompt = () => {
    if (activeTab === "functionality") {
      return generateFunctionalityPrompt();
    }
    const prompt = `${formData.do} ${formData.what} ${formData.how} ${formData.condition} ${formData.action}. ${formData.additional}`.trim();
    return prompt;
  };

  const generateFunctionalityPrompt = () => {
    let prompt = "I need the website to have all these features and functionalities:";
    
    if (functionalityData.listings.length > 0) {
      prompt += `\n- Listing with ${functionalityData.listings.join(", ")}`;
    }
    
    if (functionalityData.searchFiltering.length > 0) {
      prompt += `\n- Search and Filtering By: ${functionalityData.searchFiltering.join(", ")}`;
    }
    
    if (functionalityData.organizeBy && functionalityData.organizeCategories.length > 0) {
      prompt += `\n- Organize ${functionalityData.organizeBy} by ${functionalityData.organizeCategories.join(", ")}`;
    }
    
    if (functionalityData.detailsFor && functionalityData.detailsWith.length > 0) {
      prompt += `\n- Create Individual pages for ${functionalityData.detailsFor} with ${functionalityData.detailsWith.join(", ")}`;
    }
    
    if (functionalityData.registerFor.length > 0 && functionalityData.registrationOptions.length > 0) {
      prompt += `\n- multi-tiered authentication system for ${functionalityData.registerFor.join(", ")} with ${functionalityData.registrationOptions.join(", ")}`;
    }
    
    if (functionalityData.securityConsiderations.length > 0) {
      prompt += `\n- For Security Considerations, ${functionalityData.securityConsiderations.join(", ")}`;
    }
    
    if (functionalityData.additional.length > 0) {
      prompt += `\n- ${functionalityData.additional.join(", ")}`;
    }
    
    return prompt;
  };

  // Update editable prompt when form changes
  useEffect(() => {
    const newPrompt = generatePrompt();
    if (newPrompt) {
      setEditablePrompt(newPrompt);
    }
  }, [formData, functionalityData, activeTab]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editablePrompt);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Your prompt has been copied successfully.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    const currentPromptLength = editablePrompt.length;
    
    if (activeTab === "functionality") {
      setFunctionalityData({
        listings: [],
        searchFiltering: [],
        organizeBy: "",
        organizeCategories: [],
        detailsFor: "",
        detailsWith: [],
        registerFor: [],
        registrationOptions: [],
        securityConsiderations: [],
        additional: []
      });
    } else {
      setFormData({
        do: "",
        what: "",
        how: "",
        condition: "",
        action: "",
        additional: ""
      });
    }
    
    // Position cursor at the end of existing prompt
    setTimeout(() => {
      if (promptTextareaRef.current) {
        promptTextareaRef.current.focus();
        promptTextareaRef.current.setSelectionRange(currentPromptLength, currentPromptLength);
      }
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wand2 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Prompt Generator
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Create perfect prompts for web development without coding knowledge
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="ui" className="text-sm font-medium">UI</TabsTrigger>
            <TabsTrigger value="functionality" className="text-sm font-medium">Functionality/Features</TabsTrigger>
            <TabsTrigger value="logic" className="text-sm font-medium">Logic</TabsTrigger>
            <TabsTrigger value="database" className="text-sm font-medium">Database</TabsTrigger>
          </TabsList>

          <TabsContent value="ui" className="mt-6">
            <Card className="shadow-elegant">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Badge variant="secondary">UI</Badge>
                  User Interface Components
                </h3>
                <PromptForm 
                  formData={formData}
                  onFieldChange={handleFieldChange}
                  doOptions={doOptions}
                  whatOptions={whatOptions}
                  howOptions={howOptions}
                  conditionOptions={conditionOptions}
                  actionOptions={actionOptions}
                  additionalOptions={additionalOptions}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="functionality" className="mt-6">
            <Card className="shadow-elegant">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Badge variant="secondary">Features</Badge>
                  Functionality & Features
                </h3>
                <FunctionalityForm 
                  functionalityData={functionalityData}
                  onFieldChange={handleFunctionalityChange}
                  listingsOptions={listingsOptions}
                  searchFilteringOptions={searchFilteringOptions}
                  organizeOptions={organizeOptions}
                  organizeCategoriesOptions={organizeCategoriesOptions}
                  detailsForOptions={detailsForOptions}
                  detailsWithOptions={detailsWithOptions}
                  registerForOptions={registerForOptions}
                  registrationOptionsData={registrationOptionsData}
                  securityOptions={securityOptions}
                  functionalityAdditionalOptions={functionalityAdditionalOptions}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logic" className="mt-6">
            <Card className="shadow-elegant">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Badge variant="secondary">Logic</Badge>
                  Business Logic
                </h3>
                <PromptForm 
                  formData={formData}
                  onFieldChange={handleFieldChange}
                  doOptions={["Implement", "Create", "Update", "Remove"]}
                  whatOptions={["Logic", "Rule", "Validation", "Condition"]}
                  howOptions={["Automatically", "Dynamically", "Conditionally"]}
                  conditionOptions={conditionOptions}
                  actionOptions={actionOptions}
                  additionalOptions={additionalOptions}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="mt-6">
            <Card className="shadow-elegant">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Badge variant="secondary">Database</Badge>
                  Data Management
                </h3>
                <PromptForm 
                  formData={formData}
                  onFieldChange={handleFieldChange}
                  doOptions={["Create", "Update", "Delete", "Query"]}
                  whatOptions={["Table", "Record", "Field", "Relationship"]}
                  howOptions={["Efficiently", "Securely", "Automatically"]}
                  conditionOptions={conditionOptions}
                  actionOptions={["Data is submitted", "User logs in", "Record is created"]}
                  additionalOptions={additionalOptions}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Output Section */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Generated Prompt</h3>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetForm} size="sm">
                  Reset
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
            <Textarea
              ref={promptTextareaRef}
              value={editablePrompt || "Fill in the fields above to generate your prompt..."}
              onChange={(e) => setEditablePrompt(e.target.value)}
              placeholder="Your generated prompt will appear here and can be edited..."
              className="min-h-[100px] bg-muted border-2 border-dashed border-border resize-none"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface PromptFormProps {
  formData: any;
  onFieldChange: (field: string, value: string) => void;
  doOptions: string[];
  whatOptions: string[];
  howOptions: string[];
  conditionOptions: string[];
  actionOptions: string[];
  additionalOptions: string[];
}

const PromptForm = ({ 
  formData, 
  onFieldChange, 
  doOptions, 
  whatOptions, 
  howOptions, 
  conditionOptions, 
  actionOptions, 
  additionalOptions 
}: PromptFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Field 1: Do */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">1. Do</label>
        <Select value={formData.do} onValueChange={(value) => onFieldChange("do", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select action..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg">
            {doOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Or type custom action..."
          value={formData.do}
          onChange={(e) => onFieldChange("do", e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Field 2: What */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">2. What</label>
        <Select value={formData.what} onValueChange={(value) => onFieldChange("what", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select element..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg">
            {whatOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Or type custom element..."
          value={formData.what}
          onChange={(e) => onFieldChange("what", e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Field 3: How */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">3. How</label>
        <Select value={formData.how} onValueChange={(value) => onFieldChange("how", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select method..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg">
            {howOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Or type custom method..."
          value={formData.how}
          onChange={(e) => onFieldChange("how", e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Field 4: Condition */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">4. Condition</label>
        <Select value={formData.condition} onValueChange={(value) => onFieldChange("condition", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select condition..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg">
            {conditionOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Or type custom condition..."
          value={formData.condition}
          onChange={(e) => onFieldChange("condition", e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Field 5: Action */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">5. Action</label>
        <Select value={formData.action} onValueChange={(value) => onFieldChange("action", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select trigger..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg">
            {actionOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Or type custom trigger..."
          value={formData.action}
          onChange={(e) => onFieldChange("action", e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Field 6: Additional */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">6. Additional</label>
        <Select value={formData.additional} onValueChange={(value) => onFieldChange("additional", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select constraint..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg">
            {additionalOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Textarea
          placeholder="Or type additional requirements..."
          value={formData.additional}
          onChange={(e) => onFieldChange("additional", e.target.value)}
          className="mt-2 min-h-[80px]"
        />
      </div>
    </div>
  );
};

interface FunctionalityFormProps {
  functionalityData: any;
  onFieldChange: (field: string, value: string | string[]) => void;
  listingsOptions: string[];
  searchFilteringOptions: string[];
  organizeOptions: string[];
  organizeCategoriesOptions: string[];
  detailsForOptions: string[];
  detailsWithOptions: string[];
  registerForOptions: string[];
  registrationOptionsData: string[];
  securityOptions: string[];
  functionalityAdditionalOptions: string[];
}

const FunctionalityForm = ({ 
  functionalityData, 
  onFieldChange,
  listingsOptions,
  searchFilteringOptions,
  organizeOptions,
  organizeCategoriesOptions,
  detailsForOptions,
  detailsWithOptions,
  registerForOptions,
  registrationOptionsData,
  securityOptions,
  functionalityAdditionalOptions
}: FunctionalityFormProps) => {
  
  const handleMultiSelectChange = (field: string, option: string, checked: boolean) => {
    const currentValues = functionalityData[field] || [];
    if (checked) {
      onFieldChange(field, [...currentValues, option]);
    } else {
      onFieldChange(field, currentValues.filter((item: string) => item !== option));
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Listings */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">1. Listings (Multiple Selection)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {listingsOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`listings-${option}`}
                checked={functionalityData.listings.includes(option)}
                onCheckedChange={(checked) => handleMultiSelectChange("listings", option, checked as boolean)}
              />
              <label htmlFor={`listings-${option}`} className="text-sm text-foreground cursor-pointer">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Search and Filtering */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">2. Search and Filtering (Multiple Selection)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {searchFilteringOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`search-${option}`}
                checked={functionalityData.searchFiltering.includes(option)}
                onCheckedChange={(checked) => handleMultiSelectChange("searchFiltering", option, checked as boolean)}
              />
              <label htmlFor={`search-${option}`} className="text-sm text-foreground cursor-pointer">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Categories */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">3. Categories</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3a. Organize */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">3a. Organize (Single Selection)</label>
            <Select value={functionalityData.organizeBy} onValueChange={(value) => onFieldChange("organizeBy", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select organization type..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg">
                {organizeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3b. By */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">3b. By (Multiple Selection)</label>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
              {organizeCategoriesOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`organize-${option}`}
                    checked={functionalityData.organizeCategories.includes(option)}
                    onCheckedChange={(checked) => handleMultiSelectChange("organizeCategories", option, checked as boolean)}
                  />
                  <label htmlFor={`organize-${option}`} className="text-xs text-foreground cursor-pointer">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Details Pages */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">4. Details Pages</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 4a. For */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">4a. For (Single Selection)</label>
            <Select value={functionalityData.detailsFor} onValueChange={(value) => onFieldChange("detailsFor", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select page type..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg">
                {detailsForOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 4b. With */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">4b. With (Multiple Selection)</label>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
              {detailsWithOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`details-${option}`}
                    checked={functionalityData.detailsWith.includes(option)}
                    onCheckedChange={(checked) => handleMultiSelectChange("detailsWith", option, checked as boolean)}
                  />
                  <label htmlFor={`details-${option}`} className="text-xs text-foreground cursor-pointer">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Register/Sign in */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">5. Register/Sign in</label>
        <div className="grid grid-cols-1 gap-6">
          {/* 5a. For */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">5a. For (Multiple Selection)</label>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {registerForOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`register-${option}`}
                    checked={functionalityData.registerFor.includes(option)}
                    onCheckedChange={(checked) => handleMultiSelectChange("registerFor", option, checked as boolean)}
                  />
                  <label htmlFor={`register-${option}`} className="text-xs text-foreground cursor-pointer">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* 5b. Registration Options */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">5b. Registration Options (Multiple Selection)</label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
              {registrationOptionsData.map((option) => (
                <div key={option} className="flex items-start space-x-2">
                  <Checkbox
                    id={`registration-${option}`}
                    checked={functionalityData.registrationOptions.includes(option)}
                    onCheckedChange={(checked) => handleMultiSelectChange("registrationOptions", option, checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor={`registration-${option}`} className="text-xs text-foreground cursor-pointer leading-relaxed">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Security Considerations */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">6. Security Considerations (Multiple Selection)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {securityOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`security-${option}`}
                checked={functionalityData.securityConsiderations.includes(option)}
                onCheckedChange={(checked) => handleMultiSelectChange("securityConsiderations", option, checked as boolean)}
              />
              <label htmlFor={`security-${option}`} className="text-sm text-foreground cursor-pointer">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Additional */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">7. Additional (Multiple Selection)</label>
        <div className="grid grid-cols-1 gap-3">
          {functionalityAdditionalOptions.map((option) => (
            <div key={option} className="flex items-start space-x-2">
              <Checkbox
                id={`additional-${option}`}
                checked={functionalityData.additional.includes(option)}
                onCheckedChange={(checked) => handleMultiSelectChange("additional", option, checked as boolean)}
                className="mt-1"
              />
              <label htmlFor={`additional-${option}`} className="text-sm text-foreground cursor-pointer leading-relaxed">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;