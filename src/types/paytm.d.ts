declare global {
  interface Window {
    Paytm: {
      CheckoutJS: {
        invoke: (config: any) => void;
        onSuccess?: (response: any) => void;
        onError?: (error: any) => void;
      };
    };
  }
}

export {};
