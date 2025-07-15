import { Link } from "react-router-dom";
import { imgPath } from "../assets/imagesData";
import { 
  BarChart3, 
  FileText, 
  Package, 
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Globe
} from "lucide-react";
import { Button } from "../components/ui/button";
import { NavLanding } from "../components/nav-bar-landing/nav-landing";

export const IndexPage = () => {
  const features = [
    {
      icon: <Package className="h-8 w-8 text-primary-600" />,
      title: "Smart Inventory Management",
      description: "Track stock levels, set automated reorder points, and manage product categories with intelligent insights.",
    },
    {
      icon: <FileText className="h-8 w-8 text-primary-600" />,
      title: "Professional Invoice Generation",
      description: "Create stunning invoices with customizable templates, automatic calculations, and multi-currency support.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary-600" />,
      title: "Advanced Analytics & Reports",
      description: "Gain deep insights with real-time dashboards, sales forecasting, and comprehensive business reports.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "Enterprise Security",
      description: "Bank-level security with 2FA, data encryption, and role-based access controls.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary-600" />,
      title: "Automation Tools",
      description: "Automate repetitive tasks, set up workflows, and integrate with your existing business tools.",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary-600" />,
      title: "Multi-location Support",
      description: "Manage multiple warehouses, locations, and currencies from a single unified platform.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      company: "Johnson's Retail",
      image: imgPath.testi1,
      content: "InventoryPro has completely transformed how I manage my business. The intuitive interface and powerful features have saved me countless hours every week.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      company: "TechFlow Solutions",
      image: imgPath.testi2,
      content: "The inventory tracking features are exceptional. We've reduced stockouts by 75% and improved our order fulfillment speed dramatically.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Finance Director",
      company: "GreenLeaf Enterprises",
      image: imgPath.testi3,
      content: "The financial reporting and invoice management capabilities have streamlined our entire accounting process. Highly recommended!",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "500M+", label: "Invoices Generated" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-bodyGray-50">
      <NavLanding />
      
      <main className="flex-1">
        <section className="relative py-20 px-4 lg:py-20 bg-gradient-to-br from-primary-50 via-boldWhite to-bodyGray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
                    <Zap className="mr-2 h-4 w-4" />
                    New: AI-Powered Insights Available
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight text-bodybodyGray-800 sm:text-5xl xl:text-6xl">
                    Manage Inventory & Create Invoices with{" "}
                    <span className="text-primary-600">Ease</span>
                  </h1>
                  <p className="max-w-4xl text-xl text-bodybodyGray-600 leading-relaxed">
                    Streamline your business operations with our comprehensive inventory management and invoice generation platform. Built for modern businesses.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="bg-primary-500 transition-colors hover:bg-primary-700 text-boldWhite px-8 py-4 text-lg cursor-pointer">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg cursor-pointer border-primary-b text-primary-500 hover:text-primary-700 hover:focus-b active:scale-95 transition">
                    Watch Demo
                  </Button>
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                  {testimonials.slice(0, 4).map((t, index) => (
                        <img
                          key={index}
                          src={t.image}
                          alt={t.name}
                          className="w-8 h-8 rounded-full border-2 border-boldWhite"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-bodybodyGray-600">10,000+ happy customers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-bodybodyGray-600 ml-2">4.9/5 rating</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/dash.png"
                    alt="Dashboard Preview"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="absolute -top-4 -right-4 bg-boldWhite rounded-lg shadow-lg p-4 border border-bodyGray-300">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary-600" />
                    <span className="text-sm font-medium">+23% Growth</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-boldWhite rounded-lg shadow-lg p-4 border border-bodyGray-300">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">500+ Users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-boldWhite border-y border-bodyGray-300">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-bodyGray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-bodyGray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-bodyGray-50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-600 mb-4">
                Features
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-bodyGray-900 mb-4">
                Everything you need to manage your business
              </h2>
              <p className="max-w-3xl mx-auto text-xl text-bodyGray-600">
                Our comprehensive platform provides all the tools you need to streamline operations, 
                track inventory, and grow your business efficiently.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-boldWhite rounded-xl p-8 shadow-sm border border-bodyGray-300 hover:shadow-md transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-bodyGray-900 mb-3">{feature.title}</h3>
                  <p className="text-bodyGray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-boldWhite">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-600 mb-4">
                Testimonials
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-bodyGray-900 mb-4">
                Trusted by businesses worldwide
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-bodyGray-600">
                See what our customers have to say about their experience with InventoryPro
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-bodyGray-50 rounded-xl p-8 border border-bodyGray-300">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-bodyGray-800 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                    <div>
                      <h4 className="font-semibold text-bodyGray-900">{testimonial.name}</h4>
                      <p className="text-sm text-bodyGray-600">{testimonial.role}</p>
                      <p className="text-sm text-bodyGray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-boldWhite mb-6">
              Ready to transform your business?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust InventoryPro to manage their operations efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-boldWhite text-primary-600 hover:bg-bodyGray-100 px-8 py-4 text-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-boldWhite text-boldWhite hover:bg-boldWhite hover:text-primary-600 px-8 py-4 text-lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-bodyGray-900 text-boldWhite py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <img src="/logo/horizontal-logo.png" alt="Logo" className="h-8 mb-4 filter brightness-0 invert" />
              <p className="text-bodyGray-400 mb-4 max-w-md">
                Streamline your business operations with our comprehensive inventory management and invoice generation platform.
              </p>
              <div className="flex gap-4">
                {/* Social media icons would go here */}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-bodyGray-400">
                <li><a href="#" className="hover:text-boldWhite transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-boldWhite transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-boldWhite transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-boldWhite transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-bodyGray-400">
                <li><a href="#" className="hover:text-boldWhite transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-boldWhite transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-boldWhite transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-boldWhite transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-bodyGray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-bodyGray-400 text-sm">
              © {new Date().getFullYear()} InventoryPro. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-bodyGray-400 hover:text-boldWhite text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-bodyGray-400 hover:text-boldWhite text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-bodyGray-400 hover:text-boldWhite text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};