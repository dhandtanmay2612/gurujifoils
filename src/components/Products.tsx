import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Product {
  title: string;
  description: string;
  icon: string;
  fullDescription: string;
}

const Products = () => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const products: Product[] = [
    {
      title: "High Quality Metallic Wrapping Paper",
      description: "Premium gift wrap with metallic finish",
      icon: "/images/met-wrap-paper.jpeg",
      fullDescription: "Our metallic wrapping paper will wow your recipient before they've even opened their gift. First impressions count, and we ensure top-tier quality from start to finish."
    },
    {
      title: "Hot Stamping Foil",
      description: "Adds exclusive touch to designs",
      icon: "/images/hot-stamp.jpeg",
      fullDescription: "A staple in graphic and textile industries. Adds a unique and exclusive touch to printed designs and fabric branding."
    },
    {
      title: "Masking Tape",
      description: "Surface-protecting versatile solution",
      icon: "/images/masking-tape.jpeg",
      fullDescription: "Easy-to-use, surface-protecting tape for homes, industries, the young, and the old alike."
    },
    {
      title: "Holographic Tape",
      description: "Enhances visual appeal for packaging",
      icon: "/images/holo-type.jpeg",
      fullDescription: "Enhances visual appeal in decorative industries, ideal for packaging, branding, and special event materials."
    },
    {
      title: "Tamper Evident Film",
      description: "Security solution for brand protection",
      icon: "/images/tamp-evident.jpeg",
      fullDescription: "Security innovation that protects brands from duplication. Essential for safeguarding product authenticity."
    },
    {
      title: "Temp / Non-Temp Foils",
      description: "Specialized foils for various applications",
      icon: "/images/temp.jpeg",
      fullDescription: "Specialized foils for dynamic use cases, both heat-sensitive and non-sensitive depending on application needs."
    },
    {
      title: "Decorative Foils",
      description: "Add elegance and sparkle to every surface",
      icon: "/images/deco_foils.jpeg",
      fullDescription: "Our decorative foils are perfect for adding a touch of elegance and sparkle to packaging, crafts, and a variety of surfaces. Available in multiple finishes and colors to suit every need."
    }
  ];

  const handleCardClick = (product: Product) => {
    setActiveProduct(product);
  };

  const closeModal = () => {
    setActiveProduct(null);
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title pb-4 text-gray-600">Our Products</h2>
        
        <div 
          ref={ref} 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${inView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
        >
          {products.slice(0, 6).map((product, index) => (
            <div 
              key={index}
              onClick={() => handleCardClick(product)}
              className={`product-card cursor-pointer transition-all duration-500 delay-${index * 100} ${index === products.length - 1 ? 'col-span-1 md:col-start-2' : ''}`}
            >
              <div className="h-48 bg-center bg-cover" style={{ backgroundImage: `url(${product.icon})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-heading mb-2 text-guruji-deep-blue">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Decorative Foils Card - Centered */}
        <div className="flex justify-center mt-8">
          <div 
            onClick={() => handleCardClick(products[6])}
            className="product-card cursor-pointer transition-all duration-500 w-full max-w-md"
          >
            <div className="h-48 bg-center bg-cover" style={{ backgroundImage: `url(${products[6].icon})` }}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold font-heading mb-2 text-guruji-deep-blue">{products[6].title}</h3>
              <p className="text-gray-600">{products[6].description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {activeProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70" onClick={closeModal}>
          <div className="max-w-2xl w-full mx-4 bg-white rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="h-64 bg-center bg-cover" style={{ backgroundImage: `url(${activeProduct.icon})` }}></div>
            <div className="p-8">
              <h3 className="text-2xl font-bold font-heading mb-4 text-guruji-deep-blue">{activeProduct.title}</h3>
              <p className="text-gray-700 mb-6">{activeProduct.fullDescription}</p>
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-guruji-purple text-white rounded hover:bg-guruji-deep-blue transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;