"use client";

import { Resend } from 'resend';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Heart, ArrowRight, ArrowLeft, Flower, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { sendEmail } from '@/lib/resend';
import { useRouter } from "next/navigation";

type FormData = {
  partnerNames: string;
  weddingDate: Date;
  venueLocation: string;
  venueType: "indoor" | "outdoor" | "both";
  guestCount: string;
  email: string;
  phone: string;
  message: string;
  privacyPolicy: boolean;
};

const locations = [
  "Málaga-Centro Histórico",
  "Málaga Capital",
  "Marbella",
  "Churriana",
  "Mijas",
  "Estepona",
  "Antequera",
  "Torremolinos",
  "Benalmádena",
  "otro"
];

const guestRanges = [
  "0-50",
  "51-100",
  "101-150",
  "151-200",
  "201-250",
  "251-300",
  "Más de 300"
];

export default function Home() {
  const router = useRouter(); // Hook para redirigir
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>();
  const privacyPolicyAccepted = watch("privacyPolicy");

  // Maneja el cambio del checkbox manualmente
  const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("privacyPolicy", event.target.checked, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    if (!privacyPolicyAccepted) {
      toast.error(
        language === "es"
          ? "Debe aceptar la política de privacidad antes de enviar."
          : "You must accept the privacy policy before submitting."
      );
      return; // Detiene el envío del formulario
    }
    try {
      setLoading(true);
      console.log(data);
      const emailResponse = await sendEmail(data);
      console.log(emailResponse);

      toast.success(
        language === "es"
          ? "¡Solicitud enviada con éxito! Revisa tu correo electrónico."
          : "Request sent successfully! Check your email."
      );

      // Evita redirigir si ya estás en la página de agradecimiento
      if (window.location.pathname !== "/gracias") {
        router.push("/gracias"); // Redirige a la página de agradecimiento
      }
    } catch (error) {
      toast.error(
        language === "es"
          ? "Error al enviar la solicitud. Por favor, intenta de nuevo."
          : "Error sending request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const texts = {
    title: {
      es: "¡La decoración perfecta para tu evento empieza aquí!",
      en: "The perfect decoration for your event starts here!"
    },
    subtitle: {
      es: '🌸Creamos ambientes llenos de encanto y elegancia para que tu "sí, quiero" sea inolvidable.',
      en: "🌸We create atmospheres full of charm and elegance to make your ‘I do’ unforgettable."
    },
    uniqueDay: {
      es: "💐 Desde 1990, transformamos momentos en recuerdos inolvidables. En Altamirano Floristas, diseñamos cada detalle floral con pasión y sofisticación, para que tu boda brille con luz propia. Desde el ramo hasta la decoración personalizada al detalle, nos encargamos de hacer realidad vuestra visión y guiaros en base a nuestra experiencia.",
      en: "💐 Since 1990, we have been transforming moments into unforgettable memories. At Altamirano Floristas, we design every floral detail with passion and sophistication, so that your wedding will shine with its own light. From the bouquet to the personalised decoration in detail, we take care of making your vision come true and guide you based on our experience’."
    },

    formIntro: {
      es: "💌 Este formulario es el primer paso hacia una boda inolvidable. Déjanos encargarnos de cada detalle floral mientras tú disfrutas de cada instante. ",
      en: "💌 This form is the first step towards an unforgettable wedding. Let us take care of every floral detail while you enjoy every moment. "
    },
    names: {
      es: "¿Cómo os llamáis?",
      en: "What are your names?"
    },
    namesPlaceholder: {
      es: "ej., María & Juan",
      en: "e.g., Emma & James"
    },
    namesError: {
      es: "Por favor ingrese ambos nombres",
      en: "Please enter both names"
    },
    date: {
      es: "¿Cuándo es su día especial?",
      en: "When is your special day?"
    },
    venue: {
      es: "¿Dónde será su celebración?",
      en: "Where will your celebration take place?"
    },
    location: {
      es: "Seleccione la ubicación",
      en: "Select location"
    },
    venueType: {
      es: "Tipo de Lugar",
      en: "Venue Type"
    },
    indoor: {
      es: "Interior",
      en: "Indoor"
    },
    outdoor: {
      es: "Exterior",
      en: "Outdoor"
    },
    both: {
      es: "Ambos",
      en: "Both"
    },
    guests: {
      es: "¿Cuántos invitados aproximadamente asistirán?",
      en: "Approximately how many guests will attend?"
    },
    guestsSelect: {
      es: "Seleccione el rango de invitados",
      en: "Select guest range"
    },
    email: {
      es: "Correo electrónico",
      en: "Email address"
    },
    emailError: {
      es: "Por favor ingrese un correo electrónico válido",
      en: "Please enter a valid email address"
    },
    phone: {
      es: "Número de teléfono",
      en: "Phone number"
    },
    phoneError: {
      es: "Por favor ingrese un número de teléfono",
      en: "Please enter a phone number"
    },
    privacy: {
      es: "Acepto la política de privacidad y términos de servicio",
      en: "I agree to the privacy policy and terms of service"
    },
    privacyError: {
      es: "Debe aceptar la política de privacidad",
      en: "You must accept the privacy policy"
    },
    previous: {
      es: "Anterior",
      en: "Previous"
    },
    next: {
      es: "Siguiente",
      en: "Next"
    },
    submit: {
      es: "Enviar",
      en: "Submit"
    },
    sending: {
      es: "Enviando...",
      en: "Sending..."
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none h-screen md:h-auto"
      // style={{
      //   backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3')"
      // }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="absolute top-4 right-4 space-x-2">
          <button
            onClick={() => setLanguage("es")}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
              language === "es" ? "bg-[#A4B4A4] text-white" : "bg-white/80 hover:bg-[#A4B4A4]/20"
            )}
          >
            ES
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
              language === "en" ? "bg-[#A4B4A4] text-white" : "bg-white/80 hover:bg-[#A4B4A4]/20"
            )}
          >
            EN
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
          </div>
          <h1 className="text-4xl font-serif text-[#4A4A4A] mb-4 font-light">
            {texts.title[language]}
          </h1>
          <p className="text-lg text-[#6B6B6B] font-light mb-12">
            {texts.subtitle[language]}
          </p>

          <div className="space-y-8 text-left mb-12">
            <div>
              <h2 className="text-xl font-serif text-[#4A4A4A] mb-2">
                {texts.uniqueDay[language]}
              </h2>
              
            </div>


            <div>
              <h2 className="text-xl font-serif text-[#4A4A4A] mb-2">
                {texts.formIntro[language]}
              </h2>
              
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Evita el envío del formulario por defecto
              if (step < 5) {
                nextStep(); // Avanza al siguiente paso si no es el último
              } else {
                handleSubmit(onSubmit)(); // Envía el formulario si es el último paso
              }
            }
          }} className="space-y-8">

            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <Label
                  htmlFor="partnerNames"
                  className="text-lg text-[#4A4A4A] font-light"
                >
                  {texts.names[language]}
                </Label>
                <Input
                  id="partnerNames"
                  placeholder={texts.namesPlaceholder[language]}
                  {...register("partnerNames", { required: true })}
                  className="border-[#E8E8E8] focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg"
                />
                {errors.partnerNames && (
                  <p className="text-[#D64545] text-sm">
                    {texts.namesError[language]}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <Label className="text-lg text-[#4A4A4A] font-light">
                  {texts.date[language]}
                </Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate); // Actualiza el estado local
                    setValue("weddingDate", selectedDate); // Registra la fecha en react-hook-form
                  }}
                  className="rounded-xl border-[#E8E8E8] mx-auto"
                  classNames={{
                    day_selected: "bg-[#A4B4A4] text-white hover:bg-[#8A9B8A]",
                    day_today: "bg-[#F3F3F3] text-[#4A4A4A]",
                  }}
                  disabled={(date) => date < new Date()}
                  locale={language === "es" ? es : undefined}
                />
              </div>
            )}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                  <Label className="text-lg text-[#4A4A4A] font-light">
                    {texts.venue[language]}
                  </Label>
                  <Select onValueChange={(value) => setValue('venueLocation', value)}>
                    <SelectTrigger className="border-[#E8E8E8] focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg">
                      <SelectValue placeholder={texts.location[language]} />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg text-[#4A4A4A] font-light">
                    {texts.venueType[language]}
                  </Label>
                  <RadioGroup
                    defaultValue="indoor"
                    {...register("venueType", { required: true })} // Registrar venueType
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="indoor" id="indoor" className="text-[#A4B4A4]" />
                      <Label htmlFor="indoor" className="text-[#4A4A4A]">{texts.indoor[language]}</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="outdoor" id="outdoor" className="text-[#A4B4A4]" />
                      <Label htmlFor="outdoor" className="text-[#4A4A4A]">{texts.outdoor[language]}</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="both" id="both" className="text-[#A4B4A4]" />
                      <Label htmlFor="both" className="text-[#4A4A4A]">{texts.both[language]}</Label>
                    </div>
                  </RadioGroup>
                  {errors.venueType && (
                    <p className="text-[#D64545] text-sm">
                      {texts.namesError[language]}
                    </p>
                  )}
                </div>
              </div>
            )}


            {step === 4 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                  <Label className="text-lg text-[#4A4A4A] font-light">
                    {texts.guests[language]}
                  </Label>
                  <Select onValueChange={(value) => setValue('guestCount', value)}>
                    <SelectTrigger className="border-[#E8E8E8] focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg">
                      <SelectValue placeholder={texts.guestsSelect[language]} />
                    </SelectTrigger>
                    <SelectContent>
                      {guestRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-4">
                  <Label
                    htmlFor="email"
                    className="text-lg text-[#4A4A4A] font-light"
                  >
                    {texts.email[language]}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    className="border-[#E8E8E8] focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg"
                  />
                  {errors.email && (
                    <p className="text-[#D64545] text-sm">
                      {texts.emailError[language]}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="phone"
                    className="text-lg text-[#4A4A4A] font-light"
                  >
                    {texts.phone[language]}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone", { required: true })}
                    className="border-[#E8E8E8] focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg"
                  />
                  {errors.phone && (
                    <p className="text-[#D64545] text-sm">
                      {texts.phoneError[language]}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="message"
                    className="text-lg text-[#4A4A4A] font-light"
                  >
                    {language === "es" ? "¡Cuéntanos sobre tu boda ideal!" : "¡Cuéntanos sobre tu boda ideal!"}
                  </Label>
                  <textarea
                    id="message"
                    {...register("message", { required: false })}
                    className="border p-2 focus:ring-[#A4B4A4] focus:border-[#A4B4A4] rounded-xl py-3 text-lg w-full"
                    rows={4}
                    placeholder={language === "es" ? "Escribe tu mensaje aquí..." : "Write your message here..."}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="privacy"
                    {...register("privacyPolicy", { required: true })}
                    className="text-[#A4B4A4] border-[#E8E8E8]"
                  />
                  <Label htmlFor="privacy" className="text-sm text-[#6B6B6B]">
                    {texts.privacy[language]}
                  </Label>
                </div>
                {errors.privacyPolicy && (
                  <p className="text-[#D64545] text-sm">
                    {texts.privacyError[language]}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-between pt-8">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="flex items-center border-[#A4B4A4] text-[#4A4A4A] hover:bg-[#A4B4A4]/10"
                  disabled={loading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {texts.previous[language]}
                </Button>
              )}

              {step < 5 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto bg-[#A4B4A4] hover:bg-[#8A9B8A] text-white flex items-center rounded-full px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg"
                  disabled={loading}
                >
                  {texts.next[language]}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto bg-[#A4B4A4] hover:bg-[#8A9B8A] text-white flex items-center rounded-full px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg"
                  // disabled={loading || !privacyPolicyAccepted} // Aquí se controla si el botón está deshabilitado
                  disabled={false}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                      {texts.sending[language]}
                    </>
                  ) : (
                    <>
                      {texts.submit[language]}
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </>
                  )}
                </Button>
              )}
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}