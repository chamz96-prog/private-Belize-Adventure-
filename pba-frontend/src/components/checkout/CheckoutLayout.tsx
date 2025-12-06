import { Check } from 'lucide-react';

interface CheckoutLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

const steps = [
  { id: 1, name: 'Contact Info' },
  { id: 2, name: 'Payment' },
  { id: 3, name: 'Confirmation' }
];

export default function CheckoutLayout({ currentStep, children }: CheckoutLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Progress Stepper */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative flex justify-between">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    currentStep > step.id 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.id 
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span 
                  className={`mt-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
