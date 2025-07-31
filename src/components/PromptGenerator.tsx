import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePrompt = () => {
    const prompt = `${formData.do} ${formData.what} ${formData.how} ${formData.condition} ${formData.action}. ${formData.additional}`.trim();
    return prompt;
  };

  // Update editable prompt when form changes
  useEffect(() => {
    const newPrompt = generatePrompt();
    if (newPrompt) {
      setEditablePrompt(newPrompt);
    }
  }, [formData]);

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
    setFormData({
      do: "",
      what: "",
      how: "",
      condition: "",
      action: "",
      additional: ""
    });
    
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
                <PromptForm 
                  formData={formData}
                  onFieldChange={handleFieldChange}
                  doOptions={doOptions}
                  whatOptions={["Feature", "Function", "Component", "Module"]}
                  howOptions={howOptions}
                  conditionOptions={conditionOptions}
                  actionOptions={actionOptions}
                  additionalOptions={additionalOptions}
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

export default PromptGenerator;