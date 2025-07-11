import React, { useState } from 'react';
import './OwnerRegistration.css';

// Comprehensive country code list (ISO 3166 + phone codes)
const countryCodes = [
  { code: '+1', name: 'United States', length: 10 },
  { code: '+44', name: 'United Kingdom', length: 10 },
  { code: '+234', name: 'Nigeria', length: 10 },
  { code: '+91', name: 'India', length: 10 },
  { code: '+61', name: 'Australia', length: 9 },
  { code: '+232', name: 'Sierra Leone', length: 8 },
  { code: '+213', name: 'Algeria', length: 9 },
  { code: '+376', name: 'Andorra', length: 6 },
  { code: '+244', name: 'Angola', length: 9 },
  { code: '+1264', name: 'Anguilla', length: 10 },
  { code: '+1268', name: 'Antigua and Barbuda', length: 10 },
  { code: '+54', name: 'Argentina', length: 10 },
  { code: '+374', name: 'Armenia', length: 8 },
  { code: '+297', name: 'Aruba', length: 7 },
  { code: '+43', name: 'Austria', length: 10 },
  { code: '+994', name: 'Azerbaijan', length: 9 },
  { code: '+1242', name: 'Bahamas', length: 10 },
  { code: '+973', name: 'Bahrain', length: 8 },
  { code: '+880', name: 'Bangladesh', length: 10 },
  { code: '+1246', name: 'Barbados', length: 10 },
  { code: '+375', name: 'Belarus', length: 9 },
  { code: '+32', name: 'Belgium', length: 9 },
  { code: '+501', name: 'Belize', length: 7 },
  { code: '+229', name: 'Benin', length: 8 },
  { code: '+1441', name: 'Bermuda', length: 10 },
  { code: '+975', name: 'Bhutan', length: 8 },
  { code: '+591', name: 'Bolivia', length: 8 },
  { code: '+387', name: 'Bosnia and Herzegovina', length: 8 },
  { code: '+267', name: 'Botswana', length: 7 },
  { code: '+55', name: 'Brazil', length: 10 },
  { code: '+246', name: 'British Indian Ocean Territory', length: 7 },
  { code: '+673', name: 'Brunei Darussalam', length: 7 },
  { code: '+359', name: 'Bulgaria', length: 9 },
  { code: '+226', name: 'Burkina Faso', length: 8 },
  { code: '+257', name: 'Burundi', length: 8 },
  { code: '+855', name: 'Cambodia', length: 9 },
  { code: '+237', name: 'Cameroon', length: 9 },
  { code: '+1', name: 'Canada', length: 10 },
  { code: '+238', name: 'Cape Verde', length: 7 },
  { code: '+1345', name: 'Cayman Islands', length: 10 },
  { code: '+236', name: 'Central African Republic', length: 8 },
  { code: '+235', name: 'Chad', length: 8 },
  { code: '+56', name: 'Chile', length: 9 },
  { code: '+86', name: 'China', length: 11 },
  { code: '+57', name: 'Colombia', length: 10 },
  { code: '+269', name: 'Comoros', length: 7 },
  { code: '+242', name: 'Congo', length: 9 },
  { code: '+243', name: 'Congo, Democratic Republic', length: 9 },
  { code: '+682', name: 'Cook Islands', length: 5 },
  { code: '+506', name: 'Costa Rica', length: 8 },
  { code: '+225', name: "Côte d'Ivoire", length: 8 },
  { code: '+385', name: 'Croatia', length: 9 },
  { code: '+53', name: 'Cuba', length: 8 },
  { code: '+357', name: 'Cyprus', length: 8 },
  { code: '+420', name: 'Czech Republic', length: 9 },
  { code: '+45', name: 'Denmark', length: 8 },
  { code: '+253', name: 'Djibouti', length: 8 },
  { code: '+1767', name: 'Dominica', length: 10 },
  { code: '+1809', name: 'Dominican Republic', length: 10 },
  { code: '+593', name: 'Ecuador', length: 9 },
  { code: '+20', name: 'Egypt', length: 10 },
  { code: '+503', name: 'El Salvador', length: 8 },
  { code: '+240', name: 'Equatorial Guinea', length: 9 },
  { code: '+291', name: 'Eritrea', length: 7 },
  { code: '+372', name: 'Estonia', length: 7 },
  { code: '+251', name: 'Ethiopia', length: 9 },
  { code: '+679', name: 'Fiji', length: 7 },
  { code: '+358', name: 'Finland', length: 10 },
  { code: '+33', name: 'France', length: 9 },
  { code: '+594', name: 'French Guiana', length: 9 },
  { code: '+689', name: 'French Polynesia', length: 10 },
  { code: '+241', name: 'Gabon', length: 9 },
  { code: '+220', name: 'Gambia', length: 7 },
  { code: '+995', name: 'Georgia', length: 9 },
  { code: '+49', name: 'Germany', length: 11 },
  { code: '+233', name: 'Ghana', length: 10 },
  { code: '+350', name: 'Gibraltar', length: 5 },
  { code: '+30', name: 'Greece', length: 10 },
  { code: '+299', name: 'Greenland', length: 8 },
  { code: '+1473', name: 'Grenada', length: 10 },
  { code: '+590', name: 'Guadeloupe', length: 10 },
  { code: '+1671', name: 'Guam', length: 10 },
  { code: '+502', name: 'Guatemala', length: 8 },
  { code: '+224', name: 'Guinea', length: 9 },
  { code: '+245', name: 'Guinea-Bissau', length: 8 },
  { code: '+592', name: 'Guyana', length: 10 },
  { code: '+509', name: 'Haiti', length: 8 },
  { code: '+504', name: 'Honduras', length: 8 },
  { code: '+852', name: 'Hong Kong', length: 8 },
  { code: '+36', name: 'Hungary', length: 10 },
  { code: '+354', name: 'Iceland', length: 7 },
  { code: '+91', name: 'India', length: 10 },
  { code: '+62', name: 'Indonesia', length: 10 },
  { code: '+98', name: 'Iran', length: 10 },
  { code: '+964', name: 'Iraq', length: 10 },
  { code: '+353', name: 'Ireland', length: 9 },
  { code: '+972', name: 'Israel', length: 9 },
  { code: '+39', name: 'Italy', length: 10 },
  { code: '+1876', name: 'Jamaica', length: 10 },
  { code: '+81', name: 'Japan', length: 10 },
  { code: '+44', name: 'Jersey', length: 10 },
  { code: '+962', name: 'Jordan', length: 9 },
  { code: '+7', name: 'Kazakhstan', length: 10 },
  { code: '+254', name: 'Kenya', length: 10 },
  { code: '+686', name: 'Kiribati', length: 7 },
  { code: '+965', name: 'Kuwait', length: 8 },
  { code: '+996', name: 'Kyrgyzstan', length: 9 },
  { code: '+856', name: 'Laos', length: 8 },
  { code: '+371', name: 'Latvia', length: 8 },
  { code: '+961', name: 'Lebanon', length: 9 },
  { code: '+266', name: 'Lesotho', length: 8 },
  { code: '+231', name: 'Liberia', length: 7 },
  { code: '+218', name: 'Libya', length: 9 },
  { code: '+423', name: 'Liechtenstein', length: 10 },
  { code: '+370', name: 'Lithuania', length: 9 },
  { code: '+352', name: 'Luxembourg', length: 10 },
  { code: '+261', name: 'Madagascar', length: 9 },
  { code: '+265', name: 'Malawi', length: 9 },
  { code: '+60', name: 'Malaysia', length: 10 },
  { code: '+960', name: 'Maldives', length: 9 },
  { code: '+223', name: 'Mali', length: 9 },
  { code: '+356', name: 'Malta', length: 8 },
  { code: '+692', name: 'Marshall Islands', length: 7 },
  { code: '+596', name: 'Martinique', length: 10 },
  { code: '+222', name: 'Mauritania', length: 9 },
  { code: '+230', name: 'Mauritius', length: 10 },
  { code: '+262', name: 'Mayotte', length: 9 },
  { code: '+52', name: 'Mexico', length: 10 },
  { code: '+691', name: 'Micronesia', length: 7 },
  { code: '+373', name: 'Moldova', length: 8 },
  { code: '+377', name: 'Monaco', length: 10 },
  { code: '+976', name: 'Mongolia', length: 8 },
  { code: '+382', name: 'Montenegro', length: 8 },
  { code: '+1664', name: 'Montserrat', length: 10 },
  { code: '+212', name: 'Morocco', length: 10 },
  { code: '+258', name: 'Mozambique', length: 9 },
  { code: '+95', name: 'Myanmar', length: 9 },
  { code: '+264', name: 'Namibia', length: 9 },
  { code: '+674', name: 'Nauru', length: 8 },
  { code: '+977', name: 'Nepal', length: 10 },
  { code: '+31', name: 'Netherlands', length: 10 },
  { code: '+64', name: 'New Zealand', length: 9 },
  { code: '+505', name: 'Nicaragua', length: 8 },
  { code: '+227', name: 'Niger', length: 9 },
  { code: '+234', name: 'Nigeria', length: 10 },
  { code: '+683', name: 'Niue', length: 6 },
  { code: '+64', name: 'Norfolk Island', length: 9 },
  { code: '+850', name: 'North Korea', length: 8 },
  { code: '+47', name: 'Norway', length: 8 },
  { code: '+968', name: 'Oman', length: 8 },
  { code: '+92', name: 'Pakistan', length: 10 },
  { code: '+680', name: 'Palau', length: 7 },
  { code: '+970', name: 'Palestine', length: 9 },
  { code: '+507', name: 'Panama', length: 8 },
  { code: '+675', name: 'Papua New Guinea', length: 9 },
  { code: '+595', name: 'Paraguay', length: 9 },
  { code: '+51', name: 'Peru', length: 10 },
  { code: '+63', name: 'Philippines', length: 10 },
  { code: '+48', name: 'Poland', length: 9 },
  { code: '+351', name: 'Portugal', length: 10 },
  { code: '+1787', name: 'Puerto Rico', length: 10 },
  { code: '+974', name: 'Qatar', length: 8 },
  { code: '+262', name: 'Réunion', length: 9 },
  { code: '+40', name: 'Romania', length: 10 },
  { code: '+7', name: 'Russia', length: 10 },
  { code: '+250', name: 'Rwanda', length: 9 },
  { code: '+378', name: 'San Marino', length: 10 },
  { code: '+239', name: 'Sao Tome and Principe', length: 9 },
  { code: '+966', name: 'Saudi Arabia', length: 9 },
  { code: '+221', name: 'Senegal', length: 9 },
  { code: '+381', name: 'Serbia', length: 8 },
  { code: '+248', name: 'Seychelles', length: 9 },
  { code: '+65', name: 'Singapore', length: 8 },
  { code: '+421', name: 'Slovakia', length: 10 },
  { code: '+386', name: 'Slovenia', length: 8 },
  { code: '+677', name: 'Solomon Islands', length: 7 },
  { code: '+252', name: 'Somalia', length: 9 },
  { code: '+27', name: 'South Africa', length: 10 },
  { code: '+82', name: 'South Korea', length: 10 },
  { code: '+34', name: 'Spain', length: 9 },
  { code: '+94', name: 'Sri Lanka', length: 10 },
  { code: '+249', name: 'Sudan', length: 9 },
  { code: '+597', name: 'Suriname', length: 10 },
  { code: '+268', name: 'Swaziland', length: 8 },
  { code: '+46', name: 'Sweden', length: 10 },
  { code: '+41', name: 'Switzerland', length: 10 },
  { code: '+963', name: 'Syria', length: 9 },
  { code: '+886', name: 'Taiwan', length: 10 },
  { code: '+992', name: 'Tajikistan', length: 9 },
  { code: '+255', name: 'Tanzania', length: 10 },
  { code: '+66', name: 'Thailand', length: 10 },
  { code: '+670', name: 'Timor-Leste', length: 7 },
  { code: '+228', name: 'Togo', length: 8 },
  { code: '+690', name: 'Tokelau', length: 5 },
  { code: '+676', name: 'Tonga', length: 7 },
  { code: '+1', name: 'Trinidad and Tobago', length: 10 },
  { code: '+216', name: 'Tunisia', length: 8 },
  { code: '+90', name: 'Turkey', length: 10 },
  { code: '+737', name: 'Turkmenistan', length: 9 },
  { code: '+688', name: 'Tuvalu', length: 7 },
  { code: '+256', name: 'Uganda', length: 10 },
  { code: '+380', name: 'Ukraine', length: 10 },
  { code: '+971', name: 'United Arab Emirates', length: 9 },
  { code: '+44', name: 'United Kingdom', length: 10 },
  { code: '+1', name: 'United States', length: 10 },
  { code: '+598', name: 'Uruguay', length: 10 },
  { code: '+998', name: 'Uzbekistan', length: 9 },
  { code: '+678', name: 'Vanuatu', length: 7 },
  { code: '+39', name: 'Vatican City', length: 10 },
  { code: '+58', name: 'Venezuela', length: 10 },
  { code: '+84', name: 'Vietnam', length: 10 },
  { code: '+681', name: 'Wallis and Futuna', length: 7 },
  { code: '+967', name: 'Yemen', length: 9 },
  { code: '+260', name: 'Zambia', length: 10 },
  { code: '+263', name: 'Zimbabwe', length: 9 },
  // Add all other countries as needed
];

function OwnerRegistration({ onBack }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    businessName: '',
    businessAddress: '',
    countryCode: countryCodes[0].code,
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Valid email required.';
    if (!form.businessName.trim()) newErrors.businessName = 'Business Name is required.';
    if (!form.businessAddress.trim()) newErrors.businessAddress = 'Business Address is required.';
    const selectedCountry = countryCodes.find(c => c.code === form.countryCode);
    if (!form.phone.match(new RegExp(`^\\d{${selectedCountry.length}}$`))) {
      newErrors.phone = `Phone number must be ${selectedCountry.length} digits for ${selectedCountry.name}.`;
    }
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      // Submit logic here
      alert('Registration successful!');
    }
  };

  return (
    <div className="owner-registration-screen">
      <button className="back-btn" onClick={onBack} aria-label="Go Back">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#09278a" />
          <path d="M18 10L12 16L18 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="owner-registration-card">
        <h2>Register as Laundramat Owner</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="owner-registration-input"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="error-msg">{errors.fullName}</div>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="owner-registration-input"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-msg">{errors.email}</div>}

          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            className="owner-registration-input"
            value={form.businessName}
            onChange={handleChange}
          />
          {errors.businessName && <div className="error-msg">{errors.businessName}</div>}

          <input
            type="text"
            name="businessAddress"
            placeholder="Business Address"
            className="owner-registration-input"
            value={form.businessAddress}
            onChange={handleChange}
          />
          {errors.businessAddress && <div className="error-msg">{errors.businessAddress}</div>}

          <div className="phone-row">
            <select
              name="countryCode"
              className="country-code-select"
              value={form.countryCode}
              onChange={handleChange}
            >
              {countryCodes.map(c => (
                <option key={c.code} value={c.code}>{c.code} ({c.name})</option>
              ))}
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="owner-registration-input phone-input"
              value={form.phone}
              onChange={handleChange}
              maxLength={countryCodes.find(c => c.code === form.countryCode).length}
            />
          </div>
          {errors.phone && <div className="error-msg">{errors.phone}</div>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="owner-registration-input"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error-msg">{errors.password}</div>}

          <button className="owner-registration-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default OwnerRegistration;
