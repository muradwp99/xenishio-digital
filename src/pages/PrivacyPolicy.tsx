/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function PrivacyPolicy() {
  return (
    <div className="relative w-full pt-32 pb-16 px-6">
      <div className="max-w-3xl mx-auto bg-card border border-border-custom rounded-3xl p-8 shadow-2xl">
        <h1 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <p className="font-sans text-xs text-text-muted mb-4 uppercase">
          Effective Date: October 1, 2025
        </p>

        <div className="font-sans text-xs sm:text-sm text-text-main leading-relaxed space-y-6">
          <p>
            At Xenishio Digital, we respect intellectual property rights and data security. This privacy policy describes what data we process when you make quotes, contact requests, or book live audits on Google Meet with Md Muradujjaman.
          </p>

          <h3 className="font-display font-bold text-xs uppercase text-white tracking-wider pt-2">
            1. Information Collected
          </h3>
          <p>
            We collect the Name, Email address, Company coordinates, and brief details that you write in our cost estimator, website analyzer forms, and calendar bookings. This information is saved solely for contacting you back. Under no circumstances do we distribute or trade client emails.
          </p>

          <h3 className="font-display font-bold text-xs uppercase text-white tracking-wider pt-2">
            2. Web Analytics
          </h3>
          <p>
            We use Google Analytics 4 (GA4) with anonymous client identifiers to understand user flow trends, helping us optimize the general performance coordinates of our pages.
          </p>

          <h3 className="font-display font-bold text-xs uppercase text-white tracking-wider pt-2">
            3. Client Ownership Security
          </h3>
          <p>
            All custom codes, database structures, and theme files built for your projects are kept confidential. Upon final project signoff and milestone clearances, 100% of global copyright ownership is assigned direct to you.
          </p>

          <h3 className="font-display font-bold text-xs uppercase text-white tracking-wider pt-2">
            4. Retainers and Direct Support
          </h3>
          <p>
            Monthly audit checks and monitoring retainers follow security best practices. We enforce strict credential encryption protocols when accessing hosting panels.
          </p>

          <h3 className="font-display font-bold text-xs uppercase text-white tracking-wider pt-2">
            5. Contact Coordinator
          </h3>
          <p>
            For any queries, contact our lead engineer directly at:{' '}
            <a href="mailto:xenishiostudio@gmail.com" className="text-accent-lime underline">
              xenishiostudio@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
