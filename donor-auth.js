(() => {
  const getProfile = () => {
    if (window.AnnadanAPI) {
      const profile = window.AnnadanAPI.getProfile();
      const token = window.AnnadanAPI.getToken();
      if (profile && token && (profile.role === "donor" || profile.backendRole === "DONOR") && profile.email && profile.name) {
        return profile;
      }
    }
    try {
      const profile = JSON.parse(localStorage.getItem("annadanProfile") || "null");
      if (!profile || profile.role !== "donor" || !profile.email || !profile.name) return null;
      return profile;
    } catch (error) {
      return null;
    }
  };

  const requireDonor = () => {
    const profile = getProfile();
    const params = new URLSearchParams(window.location.search);
    if (!profile || (params.get("role") && params.get("role") !== "donor")) {
      window.location.replace("./login.html?from=home");
      return null;
    }
    return profile;
  };

  window.AnnadanDonorAuth = { getProfile, requireDonor };
})();
