export default function CheckoutStepper({ currentStep }) {
    const steps = [
        { number: 1, title: 'Shipping Address', completed: currentStep > 1 },
        { number: 2, title: 'Payment', completed: false }
    ];

    return (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep === step.number
                            ? 'bg-gradient-to-r from-rose-600 to-pink-500 border-rose-600 text-white'
                            : step.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 text-gray-400'
                        }`}>
                        {step.completed ? (
                            <i className="ri-check-line w-5 h-5 flex items-center justify-center"></i>
                        ) : (
                            step.number
                        )}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${currentStep === step.number ? 'text-rose-600' :
                            step.completed ? 'text-green-600' : 'text-gray-400'
                        }`}>
                        {step.title}
                    </span>
                    {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-4 ${step.completed ? 'bg-green-500' : 'bg-gray-200'
                            }`}></div>
                    )}
                </div>
            ))}
        </div>
    );
}