export default function PaymentSuccess() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-6">Thank you for your payment. Our team will contact you shortly.</p>
        <a href="/" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80">
          Return Home
        </a>
      </div>
    </section>
  );
}