'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../primitives/Accordion';
import { cn } from '../utils/cn';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  columns?: 1 | 2;
}

export function FAQSection({
  items,
  title = 'Frequently Asked Questions',
  subtitle,
  className,
  columns = 1,
}: FAQSectionProps) {
  const midpoint = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midpoint);
  const rightItems = items.slice(midpoint);

  const renderAccordion = (faqItems: FAQItem[], keyPrefix = '') => (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((faq, index) => (
        <AccordionItem key={`${keyPrefix}${index}`} value={`${keyPrefix}item-${index}`}>
          <AccordionTrigger className="text-left text-lg">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-[var(--foreground-muted)] leading-relaxed">
              {faq.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <section className={cn('section bg-[var(--background)]', className)}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {subtitle && (
            <p className="text-[var(--secondary)] font-medium tracking-wide uppercase text-sm mb-3">
              {subtitle}
            </p>
          )}
          <h2 className="text-[var(--foreground)]">{title}</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            'max-w-4xl mx-auto',
            columns === 2 && 'grid md:grid-cols-2 gap-8'
          )}
        >
          {columns === 1 ? (
            renderAccordion(items)
          ) : (
            <>
              {renderAccordion(leftItems, 'left-')}
              {renderAccordion(rightItems, 'right-')}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
